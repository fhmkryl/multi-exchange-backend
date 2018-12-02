import TickerModel from "../models/TickerModel";
declare abstract class ExchangeBase {
    symbols: string[];
    tickerList: TickerModel[];
    constructor();
    abstract populateSymbols(): Promise<any>;
    abstract subscribe(): void;
    abstract listen(onTickerReceived: any): void;
    getSymbols: () => string[];
    updateTickerList: (newTicker: TickerModel) => void;
}
export default ExchangeBase;
