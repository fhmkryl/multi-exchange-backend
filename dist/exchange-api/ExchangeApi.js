"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Binance_1 = require("./Binance");
var ExchangeApi = /** @class */ (function () {
    function ExchangeApi() {
        var _this = this;
        this.initMarkets = function () {
            _this.exchangeTickers.push(new ExchangeTicker('Binance', []));
            Binance_1.default.initMarkets();
        };
        this.listenExchanges = function () {
            var self = _this;
            setInterval(function () {
                self.exchangeTickers.forEach(function (item) {
                    if (item.exchange === 'Binance') {
                        item.tickers = Binance_1.default.tickerList;
                    }
                });
            }, 1000);
        };
        this.getTickersByExchange = function (exchange) {
            var exchangeTicker = _this.exchangeTickers.filter(function (item) { return item.exchange === exchange; });
            return exchangeTicker[0].tickers;
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