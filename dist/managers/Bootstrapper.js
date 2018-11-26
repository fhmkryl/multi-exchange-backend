"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExchangeManager_1 = require("./ExchangeManager");
var ExchangeDbManager_1 = require("./ExchangeDbManager");
exports.initApp = function () {
    var initLog = '';
    initLog = 'Started initializing db...<br/>';
    initDb();
    initLog += 'Finished initializing db...<br/>';
    initLog += 'App started...';
    return initLog;
};
var initDb = function () {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/multiexchange";
    MongoClient.connect(url, function (err, dbServer) {
        if (err) {
            console.log(err);
            throw err;
        }
        var db = dbServer.db("multiexchange");
        var exchanges = ExchangeManager_1.getExchangeList();
        ExchangeDbManager_1.seedExchanges(db, exchanges);
        exchanges.forEach(function (exchange) {
            exchange.status = 'Running';
            exchange.serverTime = new Date().toJSON();
            ExchangeDbManager_1.updateExchange(db, exchange);
        });
        dbServer.close();
    });
};
//# sourceMappingURL=Bootstrapper.js.map