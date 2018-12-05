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
        await self.createFetchRequest(`${this.restApiBaseUrl}/tickers?symbols=ALL`)
        .then((response:any) => {
            return response.json();
        })
        .then((result: any) => {
            result.forEach((item:any) => {
                self.symbols.push(item[0]);
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
                let ticker = self.extractTickerFromResponse(response);

                self.updateTickerList(ticker);
            }
        };
    }

    public extractTickerFromResponse(response: any): TickerModel {
        let exchangeName: string = 'Bitfinex';
        let symbol: string = this.channelSymbolMap[response[0]];
        if(symbol.endsWith('USD')) {
            symbol = `${symbol}T`;
        }
        let price: number = response[9];
        let priceChange: number = response[7];
        let priceChangePercent: number = response[8];
        let openPrice: number = 0;
        let highPrice: number = response[11];
        let lowPrice: number = response[12];
        let closePrice: number = 0;
        let volume : number = response[10];
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
            volume,
            lastUpdateTime,
            direction);

        return ticker;
    }
}