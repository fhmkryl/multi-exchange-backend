"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbUrl = '';
exports.getMongoDb = function (url) {
    if (url === void 0) { url = dbUrl; }
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/mongoose_basics', function (err) {
        if (err) {
            console.log("Unable to connect to " + url);
            throw err;
        }
        console.log("Connected to " + url);
    });
    return mongoose;
};
//# sourceMappingURL=DbManager.js.map