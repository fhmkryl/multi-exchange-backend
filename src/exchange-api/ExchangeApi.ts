import TickerModel from "../models/TickerModel";
import Binance from "./Binance";
import Bitfinex from "./Bitfinex";

export default class ExchangeApi {
    bitfinex : Bitfinex;

    exchangeTickers: ExchangeTicker[];
    constructor() {
        this.exchangeTickers = [];
        
        this.initMarkets();
        this.listenExchanges();
    }

    initMarkets = () => {
        this.exchangeTickers.push(new ExchangeTicker('Binance', []));
        this.exchangeTickers.push(new ExchangeTicker('Bitfinex', []));
        
        Binance.initMarkets();
        
        this.bitfinex = new Bitfinex();
        this.bitfinex.start();
    }

    listenExchanges = (): void => {
        let self = this;
        setInterval(function () {
            self.exchangeTickers.forEach((item: ExchangeTicker) => {
                if(item.exchange === 'Binance'){
                    item.tickers = Binance.tickerList;
                }
                if(item.exchange === 'Bitfinex'){
                    item.tickers = self.bitfinex.tickerList;
                }
            });
        }, 1000);
    }

    getTickers = (): TickerModel[] => {
        let self = this;
        let result : TickerModel[] = [];
        self.exchangeTickers.forEach((exchangeTicker: ExchangeTicker) => {
            if(exchangeTicker.tickers && exchangeTicker.tickers.length > 0){
                exchangeTicker.tickers.forEach((ticker: TickerModel) => {
                    result.push(ticker);
                });
            }
        });
    
        return result;
    }
}

class ExchangeTicker {
    exchange: string;
    tickers: TickerModel[];

    constructor(exchange: string, tickers: TickerModel[]) {
        this.exchange = exchange;
        this.tickers = tickers;
    }
}