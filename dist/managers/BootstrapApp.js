"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExchangeApiManager_1 = require("../exchange-api/ExchangeApiManager");
var ExchangeManager_1 = require("./ExchangeManager");
var BootstrapApp = /** @class */ (function () {
    function BootstrapApp(server) {
        var _this = this;
        this.start = function () {
            var self = _this;
            self.pollExchangesFromDb();
            self.startPublishing();
            self.startConsuming();
        };
        this.pollExchangesFromDb = function () {
            var self = _this;
            setInterval(function () {
                var manager = new ExchangeManager_1.ExchangeManager();
                manager.getAll().then(function (exchanges) {
                    self.exchanges = exchanges;
                });
            }, 1000);
        };
        this.startPublishing = function () {
            var self = _this;
            var io = require('socket.io').listen(self.server);
            io
                .sockets
                .on('connection', function (socket) {
                console.log('A client is connected!');
                setInterval(function () {
                    socket.emit('onExchangesReceived', { exchangeList: self.simulateExchanges(self.exchanges) });
                }, 2000);
                socket.on('subscribeToExchange', function (exchangeName) {
                    setInterval(function () {
                        var tickers = self.exchangeApiManager.getTickersByExchange(exchangeName);
                        socket.emit('onTickersReceivedByExchange', { tickerList: tickers });
                    }, 1000);
                });
                socket.on('subscribeToSymbol', function (symbol) {
                    setInterval(function () {
                        var tickers = self.exchangeApiManager.getTickersBySymbol(symbol);
                        socket.emit('onTickersReceivedBySymbol', { tickerList: tickers });
                    }, 1000);
                });
                socket.on('disconnect', function () {
                    console.log('user disconnected');
                });
            });
        };
        this.startConsuming = function () {
            var self = _this;
            setInterval(function () {
                try {
                    self.exchanges.forEach(function (exchangeItem) {
                        if (exchangeItem.status === 'Running') {
                            if (!self.exchangeApiManager.exchangeSockets[exchangeItem.name]) {
                                self.exchangeApiManager.start(exchangeItem);
                            }
                        }
                        else {
                            self.exchangeApiManager.stop(exchangeItem);
                        }
                    });
                }
                catch (err) {
                    console.log('Unable to start stream ', err);
                }
            }, 1000);
        };
        this.simulateExchanges = function (exchanges) {
            var updatedExchanges = [];
            exchanges.map(function (exchange, index, arr) {
                if (exchange.status === 'Running') {
                    exchange.serverTime = new Date();
                }
                updatedExchanges.push(exchange);
            });
            return updatedExchanges;
        };
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        this.server = server;
        this.exchanges = [];
        this.exchangeApiManager = new ExchangeApiManager_1.default();
        this.start();
    }
    return BootstrapApp;
}());
exports.default = BootstrapApp;
//# sourceMappingURL=BootstrapApp.js.map