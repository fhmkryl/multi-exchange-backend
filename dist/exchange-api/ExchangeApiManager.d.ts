import TickerModel from "../models/TickerModel";
export default class ExchangeApiManager {
    exchangeSockets: any;
    constructor(exchanges: any);
    initMarkets: (exchanges: any) => void;
    getTickers: (exchangeName: string) => TickerModel[];
}
