"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var IndexRouter = express.Router();
IndexRouter.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
exports.default = IndexRouter;
//# sourceMappingURL=IndexRoutes.js.map