"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExchangeModel_1 = require("../models/ExchangeModel");
var mongoose = require("mongoose");
var ExchangeController = /** @class */ (function () {
    function ExchangeController() {
    }
    ExchangeController.prototype.list = function (req, res) {
        ExchangeModel_1.default
            .find({})
            .exec(function (err, exchanges) {
            if (err)
                throw err;
            res.render('../views/exchange/list', { exchanges: exchanges });
        });
    };
    ExchangeController.prototype.createGet = function (req, res) {
        res.render('../views/exchange/create');
    };
    ExchangeController.prototype.createPost = function (req, res) {
        var exchangeReq = {
            name: req.body.name,
            serverTime: new Date(),
            status: 'Stopped'
        };
        var exchange = new ExchangeModel_1.default(exchangeReq);
        exchange.save(function (err) {
            if (err)
                throw err;
            res.redirect("/exchange/list");
        });
    };
    ExchangeController.prototype.updateGet = function (req, res) {
        ExchangeModel_1.default.findOne({
            _id: req.params.id
        }).exec(function (err, exchange) {
            if (err)
                throw err;
            res.render('../views/exchange/update', { exchange: exchange });
        });
    };
    ExchangeController.prototype.updatePost = function (req, res) {
        ExchangeModel_1.default.findOneAndUpdate({ _id: req.params.id }, { $set: { name: req.body.name, status: req.body.status } }, { new: true }, function (err, exchange) {
            if (err)
                throw err;
            res.redirect("/exchange/list");
        });
    };
    ExchangeController.prototype.deleteGet = function (req, res) {
        ExchangeModel_1.default
            .findOne({ _id: req.params.id })
            .exec(function (err, exchange) {
            if (err)
                throw err;
            res.render("../views/exchange/delete", { exchange: exchange });
        });
    };
    ExchangeController.prototype.deletePost = function (req, res) {
        ExchangeModel_1.default.findOneAndDelete({ _id: req.params.id }, function (err, exchange) {
            if (err)
                throw err;
            res.redirect('/exchange/list');
        });
    };
    return ExchangeController;
}());
exports.ExchangeController = ExchangeController;
//# sourceMappingURL=ExchangeController.js.map