"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var exchangeSchema = new mongoose.Schema({
    name: String,
    serverTime: Date,
    status: String,
    restApiBaseUrl: String,
    wsBaseUrl: String
});
var ExchangeModel = mongoose.model('exchange', exchangeSchema);
exports.default = ExchangeModel;
//# sourceMappingURL=ExchangeModel.js.map