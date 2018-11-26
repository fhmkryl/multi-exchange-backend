import ExchangeRoutes from "./routes/exchangeRoutes";
import IndexRoutes from "./routes/exchangeRoutes";

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost:27017/multiexchange')
  .then(() => console.log('connection succesful'))
  .catch((err : any) => console.error(err));

var App = express();

// view engine setup
App.set('views', path.join(__dirname, 'views'));
App.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended: false}));
App.use(cookieParser());
App.use(express.static(__dirname));
console.log('Static file path', __dirname);

App.use('/', IndexRoutes);
App.use('/exchange', ExchangeRoutes);

// catch 404 and forward to error handler
// App.use(function (req : any, res : any, next : any) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
App.use(function (err : any, req : any, res : any, next : any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req
    .app
    .get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default App;
