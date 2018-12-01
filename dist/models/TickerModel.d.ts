declare class TickerModel {
    exchangeName: string;
    symbol: string;
    price: number;
    lastUpdateTime: Date;
    direction: string;
    constructor(exchangeName: string, symbol: string, price: number, lastUpdateTime: Date, direction?: string);
}
export default TickerModel;
