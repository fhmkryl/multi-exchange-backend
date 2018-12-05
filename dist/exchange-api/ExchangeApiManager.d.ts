import TickerModel from "../models/TickerModel";
export default class ExchangeApiManager {
    exchangeSockets: any;
    constructor();
    start: (exchange: any) => void;
    stop: (exchangeItem: any) => void;
    getTickersByExchange: (exchangeName: string) => TickerModel[];
    getTickersBySymbol: (symbol: string) => TickerModel[];
}
