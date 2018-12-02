import TickerModel from "../models/TickerModel";
import Bitfinex from "./Bitfinex";
import Binance from "./Binance";
import Poloniex from "./Poloniex";

export default class ExchangeApiManager {
    exchangeSockets : any = {};

    constructor() {
    }

    initMarkets = (exchangeName: string) => {
        let self = this;
        if(exchangeName === 'Binance') {
            self.exchangeSockets[exchangeName] = new Binance();
        }
        if(exchangeName === 'Bitfinex')
        {
            self.exchangeSockets[exchangeName] = new Bitfinex();
        }
        if(exchangeName === 'Poloniex')
        {
            self.exchangeSockets[exchangeName] = new Poloniex();
        }

        for (var prop in self.exchangeSockets) {
            let exchangeSocket = self.exchangeSockets[prop];
            exchangeSocket.populateSymbols().then(() => {
                exchangeSocket.subscribe();
                exchangeSocket.listen((ticker: TickerModel) => {
                });
            });
        }
    }

    getTickers = (exchangeName: string) : TickerModel[] => {
        let exchangeSocket = this.exchangeSockets[exchangeName];
        if(exchangeSocket) {
            return exchangeSocket.tickerList;
        }

        return [];
    } 
}