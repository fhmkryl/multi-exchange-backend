import TickerModel from "../models/TickerModel";
export default class ExchangeApi {
    exchangeTickers: ExchangeTicker[];
    constructor();
    initMarkets: () => void;
    listenExchanges: () => void;
    getTickersByExchange: (exchange: string) => TickerModel[];
}
declare class ExchangeTicker {
    exchange: string;
    tickers: TickerModel[];
    constructor(exchange: string, tickers: TickerModel[]);
}
export {};
