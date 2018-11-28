declare class TickerModel {
    exchangeName: string;
    symbol: string;
    price: number;
    lastUpdateTime: string;
    direction: string;
    constructor(exchangeName: string, symbol: string, price: number, lastUpdateTime: string, direction?: string);
}
export default TickerModel;
