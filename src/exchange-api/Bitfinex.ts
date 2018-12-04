const fetch = require("node-fetch");
import TickerModel from "../models/TickerModel";
import ExchangeBase from "./ExchangeBase";

export default class Bitfinex extends ExchangeBase {
    channelSymbolMap: any = {};

    constructor(restApiBaseUrl: string, wsBaseUrl: string) {
        super(restApiBaseUrl, wsBaseUrl);
    }

    public async populateSymbols(){
        let self = this;
        await self.createFetchRequest(`${this.restApiBaseUrl}/symbols`)
        .then((response:any) => {
            return response.json();
        })
        .then((result: any) => {
            result.forEach((symbol:string) => {
                self.symbols.push(symbol);
            });
        });
    }

    public subscribe() {
        let self = this;
        self.createWebSocket('');
        self.webSocket.onopen = function () {
            self.symbols.forEach((item: string, index: number, arr) => {
                self.webSocket.send(JSON.stringify({ "event": "subscribe", "channel": "ticker", "pair": item }));
            });
        };
    }

    public listen() {
        let self = this;
        self.webSocket.onmessage = function (msg: any) {
            var response = JSON.parse(msg.data);
            if (response.event === 'subscribed') {
                self.channelSymbolMap[response.chanId] = response.pair;
            }

            var hb = response[1];
            if (hb != "hb" && response.event !== 'subscribed' && self.channelSymbolMap[response[0]]) {
                let symbol = self.channelSymbolMap[response[0]];
                if (symbol.endsWith('USD')) {
                    symbol = symbol + 'T';
                }
                let price = response[7];

                let ticker = self.extractTickerFromResponse(response);
                //let ticker = new TickerModel('Bitfinex', symbol, price, new Date());

                self.updateTickerList(ticker);
            }
        };
    }

    public extractTickerFromResponse(response: any): TickerModel {
        let exchangeName: string = 'Bitfinex';
        let symbol: string = response.s;
        let price: number = response.w;
        let priceChange: number = response.p;
        let priceChangePercent: number = response.P;
        let openPrice: number = response.o;
        let highPrice: number = response.h;
        let lowPrice: number = response.l;
        let closePrice: number = response.c;
        let lastUpdateTime: Date = new Date();
        let direction: string = 'Same';

        let ticker = new TickerModel(exchangeName,
            symbol,
            price,
            priceChange,
            priceChangePercent,
            openPrice,
            highPrice,
            lowPrice,
            closePrice,
            lastUpdateTime,
            direction);

        return ticker;
    }
}