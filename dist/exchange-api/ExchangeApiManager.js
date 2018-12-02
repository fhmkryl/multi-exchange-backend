"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bitfinex_1 = require("./Bitfinex");
var Binance_1 = require("./Binance");
var Poloniex_1 = require("./Poloniex");
var ExchangeApiManager = /** @class */ (function () {
    function ExchangeApiManager() {
        var _this = this;
        this.exchangeSockets = {};
        this.initMarkets = function (exchangeName) {
            var self = _this;
            if (exchangeName === 'Binance') {
                self.exchangeSockets[exchangeName] = new Binance_1.default();
            }
            if (exchangeName === 'Bitfinex') {
                self.exchangeSockets[exchangeName] = new Bitfinex_1.default();
            }
            if (exchangeName === 'Poloniex') {
                self.exchangeSockets[exchangeName] = new Poloniex_1.default();
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