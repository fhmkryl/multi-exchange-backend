var mongoose = require('mongoose');
var exchangeSchema = new mongoose.Schema({
  name: String,
  serverTime: Date,
  status: String
});

let ExchangeModel =  mongoose.model('exchange', exchangeSchema);

export default ExchangeModel;