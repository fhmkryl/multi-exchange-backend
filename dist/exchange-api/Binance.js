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
var fetch = require("node-fetch");
var TickerModel_1 = require("../models/TickerModel");
var ExchangeBase_1 = require("./ExchangeBase");
var Binance = /** @class */ (function (_super) {
    __extends(Binance, _super);
    function Binance(restApiBaseUrl, wsBaseUrl) {
        return _super.call(this, restApiBaseUrl, wsBaseUrl) || this;
    }
    Binance.prototype.populateSymbols = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.createFetchRequest(self.restApiBaseUrl + "/ticker/price")
                                .then(function (response) {
                                return response.json();
                            })
                                .then(function (result) {
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
    Binance.prototype.subscribe = function () {
        var self = this;
        self.createWebSocket('!ticker@arr');
        self.webSocket.onopen = function () {
            console.log('Web socket opened');
        };
    };
    Binance.prototype.listen = function () {
        var self = this;
        self.webSocket.onmessage = function (msg) {
            var data = JSON.parse(msg.data);
            data.forEach(function (item) {
                var ticker = self.extractTickerFromResponse(item);
                if (ticker.symbol.startsWith('BTC')) {
                    self.btcUsd = ticker.price;
                }
                if (ticker.symbol.startsWith('ETH')) {
                    self.ethUsd = ticker.price;
                }
                self.updateTickerList(ticker);
            });
        };
    };
    Binance.prototype.extractTickerFromResponse = function (response) {
        var exchangeName = 'Binance';
        var symbol = response.s;
        var price = response.c;
        var priceInDollar = 0;
        var priceChange = response.p;
        var priceChangePercent = response.P;
        var openPrice = response.o;
        var highPrice = response.h;
        var lowPrice = response.l;
        var closePrice = response.c;
        var volume = response.q;
        var lastUpdateTime = new Date();
        var direction = 'Same';
        var ticker = new TickerModel_1.default(exchangeName, symbol, price, priceInDollar, priceChange, priceChangePercent, openPrice, highPrice, lowPrice, closePrice, volume, lastUpdateTime, direction);
        return ticker;
    };
    return Binance;
}(ExchangeBase_1.default));
exports.default = Binance;
//# sourceMappingURL=Binance.js.map