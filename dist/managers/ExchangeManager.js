"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExchangeModel_1 = require("../models/ExchangeModel");
var ExchangeManager = /** @class */ (function () {
    function ExchangeManager() {
    }
    ExchangeManager.prototype.getAll = function (callback) {
        ExchangeModel_1.default
            .find({})
            .exec(function (err, exchanges) {
            if (err)
                throw err;
            callback(exchanges);
        });
    };
    ExchangeManager.prototype.create = function (exchange, callback) {
        var newExchange = new ExchangeModel_1.default();
        newExchange.name = exchange.name;
        newExchange.serverTime = exchange.serverTime;
        newExchange.status = exchange.status;
        newExchange.save(function (err) {
            if (err)
                throw err;
            callback();
        });
    };
    ExchangeManager.prototype.update = function (exchange, callback) {
        ExchangeModel_1.default.findById(exchange._id, function (err, existingExchange) {
            if (err)
                throw err;
            if (exchange.name)
                existingExchange.name = exchange.name;
            if (exchange.serverTime)
                existingExchange.serverTime = exchange.serverTime;
            if (exchange.status)
                existingExchange.status = exchange.status;
            // save the bear
            existingExchange.save(function (err) {
                if (err)
                    throw err;
                callback(existingExchange);
            });
        });
    };
    return ExchangeManager;
}());
exports.ExchangeManager = ExchangeManager;
//# sourceMappingURL=ExchangeManager.js.map