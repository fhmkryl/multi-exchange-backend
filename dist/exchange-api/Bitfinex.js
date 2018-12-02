"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require('ws');
var fetch = require("node-fetch");
var TickerModel_1 = require("../models/TickerModel");
var ExchangeBase_1 = require("./ExchangeBase");
//const symbols = ["btcusd", "ltcusd", "ltcbtc", "ethusd", "ethbtc", "etcbtc", "etcusd", "rrtusd", "rrtbtc", "zecusd", "zecbtc", "xmrusd", "xmrbtc", "dshusd", "dshbtc", "btceur", "btcjpy", "xrpusd", "xrpbtc", "iotusd", "iotbtc", "ioteth", "eosusd", "eosbtc", "eoseth", "sanusd", "sanbtc", "saneth", "omgusd", "omgbtc", "omgeth", "neousd", "neobtc", "neoeth", "etpusd", "etpbtc", "etpeth", "qtmusd", "qtmbtc", "qtmeth", "avtusd", "avtbtc", "avteth", "edousd", "edobtc", "edoeth", "btgusd", "btgbtc", "datusd", "datbtc", "dateth", "qshusd", "qshbtc", "qsheth", "yywusd", "yywbtc", "yyweth", "gntusd", "gntbtc", "gnteth", "sntusd", "sntbtc", "snteth", "ioteur", "batusd", "batbtc", "bateth", "mnausd", "mnabtc", "mnaeth", "funusd", "funbtc", "funeth", "zrxusd", "zrxbtc", "zrxeth", "tnbusd", "tnbbtc", "tnbeth", "spkusd", "spkbtc", "spketh", "trxusd", "trxbtc", "trxeth", "rcnusd", "rcnbtc", "rcneth", "rlcusd", "rlcbtc", "rlceth", "aidusd", "aidbtc", "aideth", "sngusd", "sngbtc", "sngeth", "repusd", "repbtc", "repeth", "elfusd", "elfbtc", "elfeth", "btcgbp", "etheur", "ethjpy", "ethgbp", "neoeur", "neojpy", "neogbp", "eoseur", "eosjpy", "eosgbp", "iotjpy", "iotgbp", "iosusd", "iosbtc", "ioseth", "aiousd", "aiobtc", "aioeth", "requsd", "reqbtc", "reqeth", "rdnusd", "rdnbtc", "rdneth", "lrcusd", "lrcbtc", "lrceth", "waxusd", "waxbtc", "waxeth", "daiusd", "daibtc", "daieth", "cfiusd", "cfibtc", "cfieth", "agiusd", "agibtc", "agieth", "bftusd", "bftbtc", "bfteth", "mtnusd", "mtnbtc", "mtneth", "odeusd", "odebtc", "odeeth", "antusd", "antbtc", "anteth", "dthusd", "dthbtc", "dtheth", "mitusd", "mitbtc", "miteth", "stjusd", "stjbtc", "stjeth", "xlmusd", "xlmeur", "xlmjpy", "xlmgbp", "xlmbtc", "xlmeth", "xvgusd", "xvgeur", "xvgjpy", "xvggbp", "xvgbtc", "xvgeth", "bciusd", "bcibtc", "mkrusd", "mkrbtc", "mkreth", "kncusd", "kncbtc", "knceth", "poausd", "poabtc", "poaeth", "lymusd", "lymbtc", "lymeth", "utkusd", "utkbtc", "utketh", "veeusd", "veebtc", "veeeth", "dadusd", "dadbtc", "dadeth", "orsusd", "orsbtc", "orseth", "aucusd", "aucbtc", "auceth", "poyusd", "poybtc", "poyeth", "fsnusd", "fsnbtc", "fsneth", "cbtusd", "cbtbtc", "cbteth", "zcnusd", "zcnbtc", "zcneth", "senusd", "senbtc", "seneth", "ncausd", "ncabtc", "ncaeth", "cndusd", "cndbtc", "cndeth", "ctxusd", "ctxbtc", "ctxeth", "paiusd", "paibtc", "seeusd", "seebtc", "seeeth", "essusd", "essbtc", "esseth", "atmusd", "atmbtc", "atmeth", "hotusd", "hotbtc", "hoteth", "dtausd", "dtabtc", "dtaeth", "iqxusd", "iqxbtc", "iqxeos", "wprusd", "wprbtc", "wpreth", "zilusd", "zilbtc", "zileth", "bntusd", "bntbtc", "bnteth", "absusd", "abseth", "xrausd", "xraeth", "manusd", "maneth", "bbnusd", "bbneth", "niousd", "nioeth", "dgxusd", "dgxeth", "vetusd", "vetbtc", "veteth", "utnusd", "utneth", "tknusd", "tkneth", "gotusd", "goteur", "goteth", "xtzusd", "xtzbtc", "cnnusd", "cnneth", "boxusd", "boxeth", "trxeur", "trxgbp", "trxjpy", "mgousd", "mgoeth", "rteusd", "rteeth", "yggusd", "yggeth", "mlnusd", "mlneth", "wtcusd", "wtceth", "csxusd", "csxeth", "omnusd", "omnbtc", "intusd", "inteth", "drnusd", "drneth", "pnkusd", "pnketh", "dgbusd", "dgbbtc", "bsvusd", "bsvbtc", "babusd", "babbtc", "wlousd", "wloxlm", "vldusd", "vldeth", "enjusd", "enjeth", "onlusd", "onleth", "rbtusd", "rbtbtc", "ustusd", "euteur", "eutusd"];
var Bitfinex = /** @class */ (function (_super) {
    __extends(Bitfinex, _super);
    function Bitfinex() {
        var _this = _super.call(this) || this;
        _this.ws = new WebSocket('wss://api.bitfinex.com/ws');
        _this.channelSymbolMap = {};
        return _this;
    }
    Bitfinex.prototype.populateSymbols = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, fetch('https://api.bitfinex.com/v1/symbols')
                                .then(function (response) {
                                return response.json();
                            })
                                .then(function (result) {
                                result.forEach(function (symbol) {
                                    self.symbols.push(symbol);
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Bitfinex.prototype.subscribe = function () {
        var self = this;
        self.ws.onopen = function () {
            self.symbols.forEach(function (item, index, arr) {
                self.ws.send(JSON.stringify({ "event": "subscribe", "channel": "ticker", "pair": item }));
            });
        };
    };
    Bitfinex.prototype.listen = function (onTickerReceived) {
        var self = this;
        self.ws.onmessage = function (msg) {
            var response = JSON.parse(msg.data);
            if (response.event === 'subscribed') {
                self.channelSymbolMap[response.chanId] = response.pair;
            }
            var hb = response[1];
            if (hb != "hb" && response.event !== 'subscribed' && self.channelSymbolMap[response[0]]) {
                var symbol = self.channelSymbolMap[response[0]];
                if (symbol.endsWith('USD')) {
                    symbol = symbol + 'T';
                }
                var price = response[7];
                var ticker = new TickerModel_1.default('Bitfinex', symbol, price, new Date());
                self.updateTickerList(ticker);
                onTickerReceived(ticker);
            }
        };
    };
    return Bitfinex;
}(ExchangeBase_1.default));
exports.default = Bitfinex;
//# sourceMappingURL=Bitfinex.js.map