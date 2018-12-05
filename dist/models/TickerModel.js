"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TickerModel = /** @class */ (function () {
    function TickerModel(exchangeName, symbol, price, priceInDollar, priceChange, pricePercentChange, openPrice, highPrice, lowPrice, closePrice, volume, lastUpdateTime, direction) {
        if (direction === void 0) { direction = 'Same'; }
        this.exchangeName = exchangeName;
        this.symbol = symbol;
        this.price = price;
        this.priceChange = priceChange;
        this.priceChangePercent = pricePercentChange;
        this.openPrice = openPrice;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;
        this.closePrice = closePrice;
        this.volume = volume;
        this.lastUpdateTime = lastUpdateTime;
        this.direction = direction;
    }
    return TickerModel;
}());
exports.default = TickerModel;
//# sourceMappingURL=TickerModel.js.map