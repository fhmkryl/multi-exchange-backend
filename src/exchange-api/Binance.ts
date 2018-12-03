const fetch = require("node-fetch");
import TickerModel from "../models/TickerModel";
import ExchangeBase from "./ExchangeBase";

export default class Binance extends ExchangeBase {
    constructor(restApiBaseUrl: string, wsBaseUrl: string) {
        super(restApiBaseUrl, wsBaseUrl);
    }

    public async populateSymbols(){
        let self = this;
        await fetch(`${self.restApiBaseUrl}/ticker/price`)
        .then((response:any) => {
            return response.json();
        })
        .then((result: any) => {
            result.forEach((item:any) => {
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
            data.forEach((item :any) => {
                let ticker = new TickerModel('Binance', item.s, item.p, new Date());

                self.updateTickerList(ticker);
            });
        };
    }
}