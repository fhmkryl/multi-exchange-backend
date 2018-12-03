import ExchangeBase from "./ExchangeBase";
export default class Bitfinex extends ExchangeBase {
    channelSymbolMap: any;
    constructor(restApiBaseUrl: string, wsBaseUrl: string);
    populateSymbols(): Promise<void>;
    subscribe(): void;
    listen(): void;
}
