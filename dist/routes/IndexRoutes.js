"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExchangeController_1 = require("../controllers/ExchangeController");
var express = require('express');
var IndexRouter = express.Router();
var controller = new ExchangeController_1.ExchangeController();
IndexRouter.get('/', function (req, res, next) {
    controller.list(req, res);
});
exports.default = IndexRouter;
//# sourceMappingURL=IndexRoutes.js.map