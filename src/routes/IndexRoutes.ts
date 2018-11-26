var express = require('express');
var IndexRouter = express.Router();

IndexRouter.get('/', function (req : any, res : any, next : any) {
  res.render('index', {title: 'Express'});
});

export default IndexRouter;