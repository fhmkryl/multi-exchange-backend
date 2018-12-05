"use strict";
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
var URL = require('url');
var HttpsProxyAgent = require('https-proxy-agent');
var fetch = require("node-fetch");
var WebSocket = require('ws');
var proxyUrl = 'http://10.0.7.224:8080';
var ExchangeBase = /** @class */ (function () {
    function ExchangeBase(restApiBaseUrl, wsBaseUrl) {
        var _this = this;
        this.proxyEnabled = false;
        this.createFetchRequest = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        if (!self.proxyEnabled) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(url, {
                                headers: { host: URL.parse(url).host },
                                agent: new HttpsProxyAgent(self.getParsedProxyUrl(proxyUrl))
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, fetch(url)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.createWebSocket = function (query) {
            var self = _this;
            if (self.proxyEnabled) {
                self.webSocket = new WebSocket(self.wsBaseUrl + "/" + query, { agent: new HttpsProxyAgent(self.getParsedProxyUrl(proxyUrl)) });
            }
            else {
                self.webSocket = new WebSocket(self.wsBaseUrl + "/" + query);
            }
            self.webSocket.onerror = self.onWebSocketError;
        };
        this.onWebSocketError = function (err) {
            console.log(err);
        };
        this.getParsedProxyUrl = function (proxyUrl) {
            var parsedProxyURL = URL.parse(proxyUrl);
            parsedProxyURL.secureProxy = parsedProxyURL.protocol === 'https:';
            return parsedProxyURL;
        };
        this.updateTickerList = function (newTicker) {
            if (newTicker.symbol.endsWith('BTC')) {
                newTicker.priceInDollar = newTicker.price * _this.btcUsd;
            }
            if (newTicker.symbol.endsWith('ETH')) {
                newTicker.priceInDollar = newTicker.price * _this.ethUsd;
            }
            if (newTicker.symbol.endsWith('USDT')) {
                newTicker.priceInDollar = newTicker.price;
            }
            var tickerList = _this.tickerList;
            if (tickerList.length === 0) {
                tickerList.push(newTicker);
                return;
            }
            var existingTicker = tickerList.filter(function (item) { return item.symbol === newTicker.symbol; });
            if (existingTicker.length === 0) {
                tickerList.push(newTicker);
                return;
            }
            tickerList.forEach(function (item) {
                if (item.symbol === newTicker.symbol) {
                    if (newTicker.price > item.price) {
                        item.direction = 'Up';
                    }
                    else if (newTicker.price < item.price) {
                        item.direction = 'Down';
                    }
                    else {
                        item.direction = 'Same';
                    }
                    item.price = newTicker.price;
                    item.priceInDollar = newTicker.priceInDollar;
                    item.lastUpdateTime = newTicker.lastUpdateTime;
                    return item;
                }
            });
        };
        this.restApiBaseUrl = restApiBaseUrl;
        this.wsBaseUrl = wsBaseUrl;
        this.symbols = [];
        this.tickerList = [];
        this.btcUsd = 0;
        this.ethUsd = 0;
    }
    return ExchangeBase;
}());
exports.default = ExchangeBase;
//# sourceMappingURL=ExchangeBase.js.map