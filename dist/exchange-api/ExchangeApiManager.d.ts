import TickerModel from "../models/TickerModel";
export default class ExchangeApiManager {
    exchangeSockets: any;
    constructor();
    initMarkets: (exchangeName: string) => void;
    getTickers: (exchangeName: string) => TickerModel[];
}
