import ExchangeBase from "./ExchangeBase";
export default class Binance extends ExchangeBase {
    constructor(restApiBaseUrl: string, wsBaseUrl: string);
    populateSymbols(): Promise<void>;
    subscribe(): void;
    listen(onTickerReceived: any): void;
}
