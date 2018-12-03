"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require('ws');
var ExchangeBase = /** @class */ (function () {
    function ExchangeBase(restApiBaseUrl, wsBaseUrl) {
        var _this = this;
        this.createWebSocket = function (query) {
            _this.webSocket = new WebSocket(_this.wsBaseUrl + "/" + query);
        };
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
        this.restApiBaseUrl = restApiBaseUrl;
        this.wsBaseUrl = wsBaseUrl;
        this.symbols = [];
        this.tickerList = [];
    }
    return ExchangeBase;
}());
exports.default = ExchangeBase;
//# sourceMappingURL=ExchangeBase.js.map