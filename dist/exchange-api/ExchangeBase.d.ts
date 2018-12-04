import TickerModel from "../models/TickerModel";
declare abstract class ExchangeBase {
    proxyEnabled: boolean;
    restApiBaseUrl: string;
    wsBaseUrl: string;
    webSocket: any;
    symbols: string[];
    tickerList: TickerModel[];
    constructor(restApiBaseUrl: string, wsBaseUrl: string);
    abstract populateSymbols(): Promise<any>;
    createFetchRequest: (url: string) => Promise<any>;
    createWebSocket: (query: string) => any;
    onWebSocketError: (err: any) => any;
    private getParsedProxyUrl;
    abstract subscribe(): void;
    abstract listen(): void;
    abstract extractTickerFromResponse(response: any): TickerModel;
    updateTickerList: (newTicker: TickerModel) => void;
}
export default ExchangeBase;
