import {ExchangeController} from "../controllers/ExchangeController";
import { ExchangeManager } from "../managers/ExchangeManager";

var express = require('express');
var ExchangeRoutes = express.Router();
var controller = new ExchangeController();
const manager = new ExchangeManager();


ExchangeRoutes.get('/list', function (req : any, res : any) {
  controller.list(req, res);
});

ExchangeRoutes.get('/create', function (req : any, res : any) {
  controller.createGet(req, res);
});

ExchangeRoutes.post('/create', function (req : any, res : any) {
  controller.createPost(req, res);
});

ExchangeRoutes.get('/update/:id', function (req : any, res : any) {
  controller.updateGet(req, res);
});

ExchangeRoutes.post('/update/:id', function (req : any, res : any) {
  controller.updatePost(req, res);
});

ExchangeRoutes.get('/delete/:id', function (req : any, res : any) {
  controller.deleteGet(req, res);
});

ExchangeRoutes.post('/delete/:id', function (req : any, res : any) {
  controller.deletePost(req, res);
});

ExchangeRoutes.get('/start/:id', function(req: any, res: any){
  manager.update({_id: req.params.id, status : 'Running'}, (result : any) => {
    let exchanges = manager.getAll();
    res.render('../views/exchange/listTemplate', {exchanges: exchanges});
  });
});

ExchangeRoutes.get('/stop/:id', function(req: any, res: any){
  manager.update({_id: req.params.id, status : 'Stopped'}, (result : any) => {
    let exchanges = manager.getAll();
    res.render('../views/exchange/listTemplate', {exchanges: exchanges});
  });
});

export default ExchangeRoutes;