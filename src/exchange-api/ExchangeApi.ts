import TickerModel from "../models/TickerModel";
import Binance from "./Binance";

export default class ExchangeApi {
    exchangeTickers: ExchangeTicker[];
    constructor() {
        this.exchangeTickers = [];
        
        this.initMarkets();
        this.listenExchanges();
    }

    initMarkets = () => {
        this.exchangeTickers.push(new ExchangeTicker('Binance', []));
        Binance.initMarkets();
    }

    listenExchanges = (): void => {
        let self = this;
        setInterval(function () {
            self.exchangeTickers.forEach((item: ExchangeTicker) => {
                if(item.exchange === 'Binance'){
                    item.tickers = Binance.tickerList;
                }
            });
        }, 1000);
    }

    getTickersByExchange = (exchange: string): TickerModel[] => {
        let exchangeTicker =  this.exchangeTickers.filter((item : ExchangeTicker) => item.exchange === exchange);
    
        return exchangeTicker[0].tickers;
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