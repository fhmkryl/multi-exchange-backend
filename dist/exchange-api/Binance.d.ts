import ExchangeBase from "./ExchangeBase";
export default class Binance extends ExchangeBase {
    ws: any;
    channelSymbolMap: any;
    constructor();
    populateSymbols(): Promise<void>;
    subscribe(): void;
    listen(onTickerReceived: any): void;
    private createWebSocket;
}
