"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExchangeBase = /** @class */ (function () {
    function ExchangeBase() {
        var _this = this;
        this.getSymbols = function () {
            return _this.symbols;
        };
        this.updateTickerList = function (newTicker) {
            var tickerList = _this.tickerList;
            if (tickerList.length === 0) {
                tickerList.push(newTicker);
                return;
            }
            var existingTicker = tickerList.filter(function (item) { return item.symbol === newTicker.symbol; });
            if (existingTicker.length === 0) {
                tickerList.push(newTicker);
                return;
            }
            tickerList.forEach(function (item) {
                if (item.symbol === newTicker.symbol) {
                    if (newTicker.price > item.price) {
                        item.direction = 'Up';
                    }
                    else if (newTicker.price < item.price) {
                        item.direction = 'Down';
                    }
                    else {
                        item.direction = 'Same';
                    }
                    item.price = newTicker.price;
                    item.lastUpdateTime = newTicker.lastUpdateTime;
                    return item;
                }
            });
        };
        this.symbols = [];
        this.tickerList = [];
    }
    return ExchangeBase;
}());
exports.default = ExchangeBase;
//# sourceMappingURL=ExchangeBase.js.map