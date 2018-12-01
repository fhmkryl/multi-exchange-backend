#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("./App");
var ExchangeManager_1 = require("./managers/ExchangeManager");
var ExchangeApi_1 = require("./exchange-api/ExchangeApi");
/**
 * Module dependencies.
 */
var http = require('http');
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '2999');
App_1.default.set('port', port);
/**
 * Create HTTP server.
 */
var server = http.createServer(App_1.default);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
// Loading socket.io
var io = require('socket.io').listen(server);
var exchangeApi = new ExchangeApi_1.default();
// When a client connects, we note it in the console
io
    .sockets
    .on('connection', function (socket) {
    console.log('A client is connected!');
    setInterval(function () {
        var manager = new ExchangeManager_1.ExchangeManager();
        manager.getAll(function (exchanges) {
            socket.emit('onExchangesReceived', { exchangeList: simulateExchanges(exchanges) });
        });
    }, 2000);
    setInterval(function () {
        var tickers = exchangeApi.getTickers();
        socket.emit('onTickersReceived', { tickerList: tickers });
    }, 1000);
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
function simulateExchanges(exchanges) {
    var updatedExchanges = [];
    exchanges.map(function (exchange, index, arr) {
        if (exchange.status === 'Running') {
            exchange.serverTime = new Date();
        }
        updatedExchanges.push(exchange);
    });
    return updatedExchanges;
}
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
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
function onError(error) {
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
//# sourceMappingURL=main.js.map