import TickerModel from "../models/TickerModel";
import Bitfinex from "./Bitfinex";
import Binance from "./Binance";
import Poloniex from "./Poloniex";

export default class ExchangeApiManager {
    exchangeSockets : any = {};

    constructor() {
    }

    initMarkets = (exchange: any) => {
        let self = this;
        if(exchange.name === 'Binance') {
            self.exchangeSockets[exchange.name] = new Binance(exchange.restApiBaseUrl, exchange.wsBaseUrl);
        }
        if(exchange.name === 'Bitfinex')
        {
            self.exchangeSockets[exchange.name] = new Bitfinex(exchange.restApiBaseUrl, exchange.wsBaseUrl)
        }
        if(exchange.name === 'Poloniex')
        {
            self.exchangeSockets[exchange.name] = new Poloniex(exchange.restApiBaseUrl, exchange.wsBaseUrl)
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