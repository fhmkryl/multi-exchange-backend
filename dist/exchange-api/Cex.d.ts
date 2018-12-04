import TickerModel from "../models/TickerModel";
import ExchangeBase from "./ExchangeBase";
export default class Cex extends ExchangeBase {
    channelSymbolMap: any;
    constructor(restApiBaseUrl: string, wsBaseUrl: string);
    populateSymbols(): Promise<void>;
    subscribe(): void;
    listen(): void;
    extractTickerFromResponse(response: any): TickerModel;
}
