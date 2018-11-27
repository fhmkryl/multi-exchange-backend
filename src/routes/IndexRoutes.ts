import { ExchangeController } from "../controllers/ExchangeController";

var express = require('express');
var IndexRouter = express.Router();
var controller = new ExchangeController();

IndexRouter.get('/', function (req : any, res : any, next : any) {
  controller.list(req, res);
});

export default IndexRouter;