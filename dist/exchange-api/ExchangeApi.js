"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Binance_1 = require("./Binance");
var Bitfinex_1 = require("./Bitfinex");
var ExchangeApi = /** @class */ (function () {
    function ExchangeApi() {
        var _this = this;
        this.initMarkets = function () {
            _this.exchangeTickers.push(new ExchangeTicker('Binance', []));
            _this.exchangeTickers.push(new ExchangeTicker('Bitfinex', []));
            Binance_1.default.initMarkets();
            _this.bitfinex = new Bitfinex_1.default();
            _this.bitfinex.start();
        };
        this.listenExchanges = function () {
            var self = _this;
            setInterval(function () {
                self.exchangeTickers.forEach(function (item) {
                    if (item.exchange === 'Binance') {
                        item.tickers = Binance_1.default.tickerList;
                    }
                    if (item.exchange === 'Bitfinex') {
                        item.tickers = self.bitfinex.tickerList;
                    }
                });
            }, 1000);
        };
        this.getTickers = function () {
            var self = _this;
            var result = [];
            self.exchangeTickers.forEach(function (exchangeTicker) {
                if (exchangeTicker.tickers && exchangeTicker.tickers.length > 0) {
                    exchangeTicker.tickers.forEach(function (ticker) {
                        result.push(ticker);
                    });
                }
            });
            return result;
        };
        this.exchangeTickers = [];
        this.initMarkets();
        this.listenExchanges();
    }
    return ExchangeApi;
}());
exports.default = ExchangeApi;
var ExchangeTicker = /** @class */ (function () {
    function ExchangeTicker(exchange, tickers) {
        this.exchange = exchange;
        this.tickers = tickers;
    }
    return ExchangeTicker;
}());
//# sourceMappingURL=ExchangeApi.js.map