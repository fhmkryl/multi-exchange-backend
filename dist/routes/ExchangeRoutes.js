"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExchangeController_1 = require("../controllers/ExchangeController");
var ExchangeManager_1 = require("../managers/ExchangeManager");
var express = require('express');
var ExchangeRoutes = express.Router();
var controller = new ExchangeController_1.ExchangeController();
ExchangeRoutes.get('/list', function (req, res) {
    controller.list(req, res);
});
ExchangeRoutes.get('/create', function (req, res) {
    controller.createGet(req, res);
});
ExchangeRoutes.post('/create', function (req, res) {
    controller.createPost(req, res);
});
ExchangeRoutes.get('/update/:id', function (req, res) {
    controller.updateGet(req, res);
});
ExchangeRoutes.post('/update/:id', function (req, res) {
    controller.updatePost(req, res);
});
ExchangeRoutes.get('/delete/:id', function (req, res) {
    controller.deleteGet(req, res);
});
ExchangeRoutes.post('/delete/:id', function (req, res) {
    controller.deletePost(req, res);
});
ExchangeRoutes.get('/run/:id', function (req, res) {
    var manager = new ExchangeManager_1.ExchangeManager();
    manager.updateOne({
        _id: req.params.id,
        status: 'Running'
    }, function (result) {
    });
});
ExchangeRoutes.get('/stop/:id', function (req, res) {
    res.send('OK');
});
exports.default = ExchangeRoutes;
//# sourceMappingURL=exchangeRoutes.js.map