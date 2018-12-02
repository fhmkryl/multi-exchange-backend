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
var pairIds = { 7: "BTC_BCN", 14: "BTC_BTS", 15: "BTC_BURST", 20: "BTC_CLAM", 25: "BTC_DGB", 27: "BTC_DOGE", 24: "BTC_DASH", 38: "BTC_GAME", 43: "BTC_HUC", 50: "BTC_LTC", 51: "BTC_MAID", 58: "BTC_OMNI", 61: "BTC_NAV", 64: "BTC_NMC", 69: "BTC_NXT", 75: "BTC_PPC", 89: "BTC_STR", 92: "BTC_SYS", 97: "BTC_VIA", 100: "BTC_VTC", 108: "BTC_XCP", 114: "BTC_XMR", 116: "BTC_XPM", 117: "BTC_XRP", 112: "BTC_XEM", 148: "BTC_ETH", 150: "BTC_SC", 155: "BTC_FCT", 162: "BTC_DCR", 163: "BTC_LSK", 167: "BTC_LBC", 168: "BTC_STEEM", 170: "BTC_SBD", 171: "BTC_ETC", 174: "BTC_REP", 177: "BTC_ARDR", 178: "BTC_ZEC", 182: "BTC_STRAT", 184: "BTC_PASC", 185: "BTC_GNT", 189: "BTC_BCH", 192: "BTC_ZRX", 194: "BTC_CVC", 196: "BTC_OMG", 198: "BTC_GAS", 200: "BTC_STORJ", 201: "BTC_EOS", 204: "BTC_SNT", 207: "BTC_KNC", 210: "BTC_BAT", 213: "BTC_LOOM", 221: "BTC_QTUM", 232: "BTC_BNT", 229: "BTC_MANA", 121: "USDT_BTC", 216: "USDT_DOGE", 122: "USDT_DASH", 123: "USDT_LTC", 124: "USDT_NXT", 125: "USDT_STR", 126: "USDT_XMR", 127: "USDT_XRP", 149: "USDT_ETH", 219: "USDT_SC", 218: "USDT_LSK", 173: "USDT_ETC", 175: "USDT_REP", 180: "USDT_ZEC", 217: "USDT_GNT", 191: "USDT_BCH", 220: "USDT_ZRX", 203: "USDT_EOS", 206: "USDT_SNT", 209: "USDT_KNC", 212: "USDT_BAT", 215: "USDT_LOOM", 223: "USDT_QTUM", 234: "USDT_BNT", 231: "USDT_MANA", 129: "XMR_BCN", 132: "XMR_DASH", 137: "XMR_LTC", 138: "XMR_MAID", 140: "XMR_NXT", 181: "XMR_ZEC", 166: "ETH_LSK", 169: "ETH_STEEM", 172: "ETH_ETC", 176: "ETH_REP", 179: "ETH_ZEC", 186: "ETH_GNT", 190: "ETH_BCH", 193: "ETH_ZRX", 195: "ETH_CVC", 197: "ETH_OMG", 199: "ETH_GAS", 202: "ETH_EOS", 205: "ETH_SNT", 208: "ETH_KNC", 211: "ETH_BAT", 214: "ETH_LOOM", 222: "ETH_QTUM", 233: "ETH_BNT", 230: "ETH_MANA", 224: "USDC_BTC", 226: "USDC_USDT", 225: "USDC_ETH" };
var codeConversion = { BTC_ETH: "ETHBTC", USDT_BTC: "BTCUSD", USDT_LTC: "LTCUSD", USDT_ETH: "LTCETH", USDT_XRP: "XRPUSD", USDT_DASH: "DASHUSD", USDT_XMR: "XMRUSD", USDT_ZEC: "ZECUSD", USDT_NXT: "NXTUSD", BTC_LTC: "LTCBTC", BTC_DASH: "DASHBTC", BTC_POT: "POTBTC", BTC_XMR: "XMRBTC", BTC_DOGE: "DOGEBTC", BTC_ZEC: "ZECBTC", BTC_XLM: "XLMBTC", BTC_ETC: "ETCBTC", BTC_MAID: "MAIDBTC", BTC_XEM: "XEMBTC", BTC_BTS: "BTSBTC", BTC_BCH: "BCHBTC", USDT_BCH: "BCHUSD", BTC_XRP: "XRPBTC" };
var Poloniex = /** @class */ (function (_super) {
    __extends(Poloniex, _super);
    function Poloniex() {
        var _this = _super.call(this) || this;
        _this.ws = new WebSocket('wss://api.bitfinex.com/ws');
        _this.channelSymbolMap = {};
        return _this;
    }
    Poloniex.prototype.populateSymbols = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, fetch('https://api.binance.com/api/v3/ticker/price')
                                .then(function (response) {
                                return response.json();
                            })
                                .then(function (result) {
                                var index = 0;
                                result.forEach(function (item) {
                                    self.symbols.push(item.symbol);
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Poloniex.prototype.subscribe = function () {
        var self = this;
        self.ws = new WebSocket('wss://api2.poloniex.com');
        self.ws.onopen = function () {
            var query = {
                "command": "subscribe",
                "channel": 1002
            };
            self.ws.send(JSON.stringify(query));
        };
    };
    Poloniex.prototype.listen = function (onTickerReceived) {
        var self = this;
        self.ws.onmessage = function (msg) {
            try {
                var data = JSON.parse(msg.data);
                var channelId = data[2][0];
                var tmpSymbol = pairIds[channelId];
                var symbol = codeConversion[tmpSymbol];
                if (symbol) {
                    if (symbol.endsWith('USD')) {
                        symbol = symbol + 'T';
                    }
                    var price = data[2][1];
                    var ticker = new TickerModel_1.default('Poloniex', symbol, price, new Date());
                    self.updateTickerList(ticker);
                    onTickerReceived(ticker);
                }
            }
            catch (_a) {
            }
        };
    };
    return Poloniex;
}(ExchangeBase_1.default));
exports.default = Poloniex;
//# sourceMappingURL=Poloniex.js.map