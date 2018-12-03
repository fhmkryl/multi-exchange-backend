import ExchangeBase from "./ExchangeBase";
export default class Poloniex extends ExchangeBase {
    channelSymbolMap: any;
    constructor(restApiBaseUrl: string, wsBaseUrl: string);
    populateSymbols(): Promise<void>;
    subscribe(): void;
    listen(): void;
}
