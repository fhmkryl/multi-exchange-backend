import TickerModel from "../models/TickerModel";
import Bitfinex from "./Bitfinex";
import Binance from "./Binance";
import Poloniex from "./Poloniex";

export default class ExchangeApiManager {
    exchangeSockets: any;

    constructor() {
        this.exchangeSockets = {};
    }

    start = (exchange: any) => {
        let self = this;
        if (exchange.name === 'Binance') {
            self.exchangeSockets[exchange.name] = new Binance(exchange.restApiBaseUrl, exchange.wsBaseUrl);
        }
        if (exchange.name === 'Bitfinex') {
            self.exchangeSockets[exchange.name] = new Bitfinex(exchange.restApiBaseUrl, exchange.wsBaseUrl)
        }
        if (exchange.name === 'Poloniex') {
            self.exchangeSockets[exchange.name] = new Poloniex(exchange.restApiBaseUrl, exchange.wsBaseUrl)
        }

        let exchangeSocket = self.exchangeSockets[exchange.name];
        exchangeSocket.populateSymbols().then(() => {
            exchangeSocket.subscribe();
            exchangeSocket.listen((ticker: TickerModel) => {
            });
        });
    }

    stop = (exchangeItem: any) => {
        delete this.exchangeSockets[exchangeItem.name];
    }


    getTickersByExchange = (exchangeName: string): TickerModel[] => {
        let exchangeSocket = this.exchangeSockets[exchangeName];
        if (exchangeSocket) {
            return exchangeSocket.tickerList;
        }

        return [];
    }

    getTickersBySymbol = (symbol: string) : TickerModel[] => {
        let self = this;

        let tickerList: TickerModel[] = [];
        for(let prop in self.exchangeSockets){
            let socket = self.exchangeSockets[prop];
            let tickers = socket.tickerList.filter((tickerItem: any) => tickerItem.symbol === symbol);
            if(tickers && tickers.length > 0){
                tickerList = [...tickerList, tickers[0]];
            }
        }

        return tickerList;
    }
}