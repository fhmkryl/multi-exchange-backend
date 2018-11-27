declare class TickerModel {
    exchangeName: string;
    symbol: string;
    price: number;
    lastUpdateTime: string;
    constructor(exchangeName: string, symbol: string, price: number, lastUpdateTime: string);
}
export default TickerModel;
