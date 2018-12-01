import TickerModel from "../models/TickerModel";
export default class Bitfinex {
    ws: any;
    channelSymbolMap: any;
    tickerList: TickerModel[];
    constructor();
    start: () => void;
    updateTickerList: (newTicker: TickerModel) => void;
}
