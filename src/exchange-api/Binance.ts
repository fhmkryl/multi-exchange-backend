const fetch = require("node-fetch");
import TickerModel from "../models/TickerModel";
import ExchangeBase from "./ExchangeBase";

export default class Binance extends ExchangeBase {
    proxyEnabled: boolean;
    constructor(restApiBaseUrl: string, wsBaseUrl: string) {
        super(restApiBaseUrl, wsBaseUrl);
    }

    public async populateSymbols() {
        let self = this;
        await self.createFetchRequest(`${self.restApiBaseUrl}/ticker/price`)
            .then((response: any) => {
                return response.json();
            })
            .then((result: any) => {
                result.forEach((item: any) => {
                    self.symbols.push(item.symbol);
                });
            });
    }

    public subscribe() {
        let self = this;
        self.createWebSocket('!ticker@arr');
        self.webSocket.onopen = function () {
            console.log('Web socket opened');
        };
    }

    public listen() {
        let self = this;
        self.webSocket.onmessage = function (msg: any) {
            let data = JSON.parse(msg.data);
            data.forEach((item: any) => {
                let ticker = self.extractTickerFromResponse(item);
                if(ticker.symbol.startsWith('BTC')){
                    self.btcUsd = ticker.price;
                }
                if(ticker.symbol.startsWith('ETH')){
                    self.ethUsd = ticker.price;
                }
                self.updateTickerList(ticker);
            });
        };
    }

    public extractTickerFromResponse(response: any): TickerModel {
        let exchangeName: string = 'Binance';
        let symbol: string = response.s;
        let price: number = response.c;
        let priceInDollar : number = 0;
        let priceChange: number = response.p;
        let priceChangePercent: number = response.P;
        let openPrice: number = response.o;
        let highPrice: number = response.h;
        let lowPrice: number = response.l;
        let closePrice: number = response.c;
        let volume : number = response.q;
        let lastUpdateTime: Date = new Date();
        let direction: string = 'Same';

        let ticker = new TickerModel(exchangeName,
            symbol,
            price,
            priceInDollar,
            priceChange,
            priceChangePercent,
            openPrice,
            highPrice,
            lowPrice,
            closePrice,
            volume,
            lastUpdateTime,
            direction);

        return ticker;
    }
}