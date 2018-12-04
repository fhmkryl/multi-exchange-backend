import TickerModel from "../models/TickerModel";
import ExchangeBase from "./ExchangeBase";
export default class Binance extends ExchangeBase {
    proxyEnabled: boolean;
    constructor(restApiBaseUrl: string, wsBaseUrl: string);
    populateSymbols(): Promise<void>;
    subscribe(): void;
    listen(): void;
    extractTickerFromResponse(response: any): TickerModel;
}
