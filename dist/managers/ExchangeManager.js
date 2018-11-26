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
    return ExchangeManager;
}());
exports.ExchangeManager = ExchangeManager;
//# sourceMappingURL=ExchangeManager.js.map