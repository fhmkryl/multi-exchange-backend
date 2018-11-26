var MongooseDb = /** @class */ (function () {
    function MongooseDb(url) {
        var _this = this;
        this.connect = function (url) {
            _this.mongoose.connect(url);
        };
        this.mongoose = require('mongoose');
    }
    return MongooseDb;
}());
//# sourceMappingURL=IDb.js.map