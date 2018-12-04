"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExchangeApiManager_1 = require("../exchange-api/ExchangeApiManager");
var ExchangeManager_1 = require("./ExchangeManager");
var BootstrapApp = /** @class */ (function () {
    function BootstrapApp(server) {
        var _this = this;
        this.start = function () {
            var self = _this;
            var manager = new ExchangeManager_1.ExchangeManager();
            manager.getAll().then(function (exchanges) {
                var io = require('socket.io').listen(self.server);
                io
                    .sockets
                    .on('connection', function (socket) {
                    console.log('A client is connected!');
                    setInterval(function () {
                        socket.emit('onExchangesReceived', { exchangeList: self.simulateExchanges(exchanges) });
                    }, 2000);
                    socket.on('subscribe', function (exchangeName) {
                        var exchangeManager = new ExchangeManager_1.ExchangeManager();
                        exchangeManager.getAll().then(function (exchanges) {
                            exchanges.forEach(function (exchangeItem) {
                                if (exchangeItem.name === exchangeName) {
                                    var exchangeApiManager_1 = new ExchangeApiManager_1.default();
                                    exchangeApiManager_1.initMarkets(exchangeItem);
                                    setInterval(function () {
                                        var tickers = exchangeApiManager_1.getTickers(exchangeName);
                                        socket.emit('onTickersReceived', { tickerList: tickers });
                                    }, 1000);
                                    return;
                                }
                            });
                        });
                    });
                    socket.on('disconnect', function () {
                        console.log('user disconnected');
                    });
                });
            });
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
        this.server = server;
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }
    return BootstrapApp;
}());
exports.default = BootstrapApp;
//# sourceMappingURL=BootstrapApp.js.map