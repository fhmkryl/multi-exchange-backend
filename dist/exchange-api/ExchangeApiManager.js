"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bitfinex_1 = require("./Bitfinex");
var Binance_1 = require("./Binance");
var Poloniex_1 = require("./Poloniex");
var ExchangeApiManager = /** @class */ (function () {
    function ExchangeApiManager() {
        var _this = this;
        this.exchangeSockets = {};
        this.initMarkets = function (exchange) {
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
            var _loop_1 = function () {
                var exchangeSocket = self.exchangeSockets[prop];
                exchangeSocket.populateSymbols().then(function () {
                    exchangeSocket.subscribe();
                    exchangeSocket.listen(function (ticker) {
                    });
                });
            };
            for (var prop in self.exchangeSockets) {
                _loop_1();
            }
        };
        this.getTickers = function (exchangeName) {
            var exchangeSocket = _this.exchangeSockets[exchangeName];
            if (exchangeSocket) {
                return exchangeSocket.tickerList;
            }
            return [];
        };
    }
    return ExchangeApiManager;
}());
exports.default = ExchangeApiManager;
//# sourceMappingURL=ExchangeApiManager.js.map