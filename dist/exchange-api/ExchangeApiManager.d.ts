import TickerModel from "../models/TickerModel";
export default class ExchangeApiManager {
    exchangeSockets: any;
    constructor();
    initMarkets: (exchange: any) => void;
    getTickers: (exchangeName: string) => TickerModel[];
}
