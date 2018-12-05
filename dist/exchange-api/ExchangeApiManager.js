"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bitfinex_1 = require("./Bitfinex");
var Binance_1 = require("./Binance");
var Poloniex_1 = require("./Poloniex");
var ExchangeApiManager = /** @class */ (function () {
    function ExchangeApiManager() {
        var _this = this;
        this.start = function (exchange) {
            var self = _this;
            if (exchange.name === 'Binance') {
                self.exchangeSockets[exchange.name] = new Binance_1.default(exchange.restApiBaseUrl, exchange.wsBaseUrl);
            }
            if (exchange.name === 'Bitfinex') {
                self.exchangeSockets[exchange.name] = new Bitfinex_1.default(exchange.restApiBaseUrl, exchange.wsBaseUrl);
            }
            if (exchange.name === 'Poloniex') {
                self.exchangeSockets[exchange.name] = new Poloniex_1.default(exchange.restApiBaseUrl, exchange.wsBaseUrl);
            }
            var exchangeSocket = self.exchangeSockets[exchange.name];
            exchangeSocket.populateSymbols().then(function () {
                exchangeSocket.subscribe();
                exchangeSocket.listen(function (ticker) {
                });
            });
        };
        this.stop = function (exchangeItem) {
            delete _this.exchangeSockets[exchangeItem.name];
        };
        this.getTickersByExchange = function (exchangeName) {
            var exchangeSocket = _this.exchangeSockets[exchangeName];
            if (exchangeSocket) {
                return exchangeSocket.tickerList;
            }
            return [];
        };
        this.getTickersBySymbol = function (symbol) {
            var self = _this;
            var tickerList = [];
            for (var prop in self.exchangeSockets) {
                var socket = self.exchangeSockets[prop];
                var tickers = socket.tickerList.filter(function (tickerItem) { return tickerItem.symbol === symbol; });
                if (tickers && tickers.length > 0) {
                    tickerList = tickerList.concat([tickers[0]]);
                }
            }
            return tickerList;
        };
        this.exchangeSockets = {};
    }
    return ExchangeApiManager;
}());
exports.default = ExchangeApiManager;
//# sourceMappingURL=ExchangeApiManager.js.map