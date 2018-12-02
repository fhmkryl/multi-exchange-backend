"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bitfinex_1 = require("./Bitfinex");
var ExchangeApiManager = /** @class */ (function () {
    function ExchangeApiManager(exchanges) {
        var _this = this;
        this.exchangeSockets = {};
        this.initMarkets = function (exchanges) {
            var self = _this;
            exchanges.forEach(function (exchange) {
                if (exchange.name === 'Bitfinex')
                    self.exchangeSockets[exchange.name] = new Bitfinex_1.default();
            });
            var _loop_1 = function () {
                var exchangeSocket = self.exchangeSockets[prop];
                exchangeSocket.populateSymbols().then(function () {
                    exchangeSocket.subscribe();
                    exchangeSocket.listen(function (ticker) {
                        // let tickerList = exchangeSocket.tickerList;
                        // self.exchangeSockets[prop].tickerList = tickerList;
                    });
                });
            };
            for (var prop in self.exchangeSockets) {
                _loop_1();
            }
        };
        this.getTickers = function (exchangeName) {
            var exchangeSocket = _this.exchangeSockets[exchangeName];
            return exchangeSocket.tickerList;
        };
        this.initMarkets(exchanges);
    }
    return ExchangeApiManager;
}());
exports.default = ExchangeApiManager;
//# sourceMappingURL=ExchangeApiManager.js.map