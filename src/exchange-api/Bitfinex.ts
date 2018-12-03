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
        await fetch(`${this.restApiBaseUrl}/symbols`)
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
                let ticker = new TickerModel('Bitfinex', symbol, price, new Date());

                self.updateTickerList(ticker);
            }
        };
    }
}