import TickerModel from "../models/TickerModel";
declare abstract class ExchangeBase {
    restApiBaseUrl: string;
    wsBaseUrl: string;
    webSocket: any;
    symbols: string[];
    tickerList: TickerModel[];
    constructor(restApiBaseUrl: string, wsBaseUrl: string);
    abstract populateSymbols(): Promise<any>;
    createWebSocket: (query: string) => any;
    abstract subscribe(): void;
    abstract listen(): void;
    updateTickerList: (newTicker: TickerModel) => void;
}
export default ExchangeBase;
