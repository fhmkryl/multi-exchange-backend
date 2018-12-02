import TickerModel from "../models/TickerModel";
import Bitfinex from "./Bitfinex";

export default class ExchangeApiManager {
    exchangeSockets : any = {};

    constructor(exchanges: any) {
        this.initMarkets(exchanges);
    }

    initMarkets = (exchanges: any) => {
        let self = this;
        exchanges.forEach((exchange: any) => {
            if(exchange.name === 'Bitfinex')
                self.exchangeSockets[exchange.name] = new Bitfinex();
        });

        for (var prop in self.exchangeSockets) {
            let exchangeSocket = self.exchangeSockets[prop];
            exchangeSocket.populateSymbols().then(() => {
                exchangeSocket.subscribe();
                exchangeSocket.listen((ticker: TickerModel) => {
                    // let tickerList = exchangeSocket.tickerList;
                    // self.exchangeSockets[prop].tickerList = tickerList;
                });
            });
        }
    }

    getTickers = (exchangeName: string) : TickerModel[] => {
        let exchangeSocket = this.exchangeSockets[exchangeName];

        return exchangeSocket.tickerList;
    } 
}