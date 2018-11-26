"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedExchanges = function (db, exchanges) {
    exports.deleteAllExchanges(db);
    exports.bulkInsertExchanges(db, exchanges);
};
exports.getAllExchanges = function (callback) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/multiexchange";
    MongoClient.connect(url, function (err, dbServer) {
        if (err) {
            console.log(err);
            throw err;
        }
        var db = dbServer.db("multiexchange");
        db.collection("exchanges").find({}).toArray(function (err, result) {
            if (err)
                throw err;
            callback(result);
        });
        dbServer.close();
    });
    return [];
};
exports.bulkInsertExchanges = function (db, exchanges) {
    exchanges.forEach(function (exchange) {
        exports.insertExchange(db, exchange);
    });
};
exports.deleteAllExchanges = function (db) {
    db.collection("exchanges").deleteMany({}, function (err, obj) {
        if (err) {
            console.log('Error deleting exchanges', err);
            throw err;
        }
        console.log('Exchanges deleted');
    });
};
exports.insertExchange = function (db, exchange) {
    db
        .collection("exchanges")
        .insertOne(exchange, function (err, res) {
        if (err) {
            console.log('Error inserting exchange', err);
            throw err;
        }
        console.log('Saved', exchange);
    });
};
exports.updateExchange = function (db, exchange) {
    db
        .collection("exchanges")
        .updateOne({ name: exchange.name }, { $set: { status: exchange.status, serverTime: exchange.serverTime } }, function (err, res) {
        if (err) {
            console.log('Error updating exchange', err);
            throw err;
        }
        console.log('Updated', exchange);
    });
};
//# sourceMappingURL=ExchangeDbManager.js.map