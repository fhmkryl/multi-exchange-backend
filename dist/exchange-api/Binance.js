"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TickerModel_1 = require("../models/TickerModel");
var Binance = require('node-binance-api')().options({
    APIKEY: '5enQYcMQk2J3syHCao9xgJOnnPoGtDMhSRRAzG2Gxo90TBzXPG1itcXikQc2VRDh',
    APISECRET: 'uWJQXigS3AjftKe8c6xK2t3rkTqkmfeeNPwcycBLGXXsuU4eUvLkPY9qcOnB2UYI',
    useServerTime: true
});
var markets = [];
var tickerList = [];
Binance.initMarkets = function () {
    markets = [];
    Binance.prevDay(false, function (error, prevDay) {
        if (error)
            return console.log(error.body);
        for (var _i = 0, prevDay_1 = prevDay; _i < prevDay_1.length; _i++) {
            var obj = prevDay_1[_i];
            var symbol = obj.symbol;
            if (!symbol.endsWith('BTC') && !symbol.endsWith('USDT'))
                continue;
            markets.push(symbol);
        }
    });
    Binance.websockets.trades(markets, function (trades) {
        var eventType = trades.e, eventTime = trades.E, symbol = trades.s, price = trades.p, quantity = trades.q, maker = trades.m, tradeId = trades.a;
        var newTicker = new TickerModel_1.default('Binance', symbol, price, eventTime);
        updateTickerList(newTicker);
        Binance.tickerList = tickerList;
    });
};
var updateTickerList = function (newTicker) {
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
exports.default = Binance;
//# sourceMappingURL=Binance.js.map