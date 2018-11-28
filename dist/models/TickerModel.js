"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TickerModel = /** @class */ (function () {
    function TickerModel(exchangeName, symbol, price, lastUpdateTime, direction) {
        if (direction === void 0) { direction = 'Same'; }
        this.exchangeName = exchangeName;
        this.symbol = symbol;
        this.price = price;
        this.lastUpdateTime = lastUpdateTime;
        this.direction = direction;
    }
    return TickerModel;
}());
exports.default = TickerModel;
//# sourceMappingURL=TickerModel.js.map