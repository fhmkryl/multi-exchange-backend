#!/usr/bin/env node

import App from "./App";
import { ExchangeManager } from "./managers/ExchangeManager";
import Binance from "./exchange-api/Binance";
import TickerModel from "./models/TickerModel";

/**
 * Module dependencies.
 */
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '2999');
App.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(App);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Loading socket.io
var io = require('socket.io').listen(server);

// When a client connects, we note it in the console
io
  .sockets
  .on('connection', function (socket : any) {
    console.log('A client is connected!');

    Binance.initMarkets();
    let tickers: TickerModel[] = [];
    Binance.onReceivedTickers((ticker: any) => {
      let pChanged = priceChanged(tickers, ticker);
      if(pChanged){
        socket.emit('onTickersReceived', {ticker: ticker});
      }
    });

    setInterval(function () {
      let manager = new ExchangeManager();
      manager.getAll((exchanges : any) => {
        socket.emit('onExchangesReceived', {exchangeList: simulateExchanges(exchanges)});
      });
    }, 2000);

    socket.on('disconnect', () => {
      console.log('user disconnected');
    })
  });

  function priceChanged(tickers: TickerModel[], newTicker: any){
    let existingTicker = tickers.filter((item: any) => item.symbol === newTicker.symbol)[0];
    if(existingTicker){
      if(existingTicker.price !== newTicker.price){
        console.log(existingTicker.symbol ,existingTicker.price, newTicker.price);
        existingTicker.price = newTicker.price;
        return true;
      }
      return false;
    }

    tickers.push(newTicker);
    return true;
  }

  function simulateExchanges(exchanges: any) : any{
    let updatedExchanges : any = [];
    exchanges.map((exchange: any, index: any, arr: any) => {
      if(exchange.status === 'Running'){
        exchange.serverTime = new Date();
      }

      updatedExchanges.push(exchange);
    });

    return updatedExchanges;
  }


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
