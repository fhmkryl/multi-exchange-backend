declare class TickerModel {
    exchangeName: string;
    symbol: string;
    price: number;
    priceInDollar: number;
    priceChange: number;
    priceChangePercent: number;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    closePrice: number;
    lastUpdateTime: Date;
    direction: string;
    constructor(exchangeName: string, symbol: string, price: number, priceChange: number, pricePercentChange: number, openPrice: number, highPrice: number, lowPrice: number, closePrice: number, lastUpdateTime: Date, direction?: string);
}
export default TickerModel;
