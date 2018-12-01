import TickerModel from "../models/TickerModel";
import Bitfinex from "./Bitfinex";
export default class ExchangeApi {
    bitfinex: Bitfinex;
    exchangeTickers: ExchangeTicker[];
    constructor();
    initMarkets: () => void;
    listenExchanges: () => void;
    getTickers: () => TickerModel[];
}
declare class ExchangeTicker {
    exchange: string;
    tickers: TickerModel[];
    constructor(exchange: string, tickers: TickerModel[]);
}
export {};
