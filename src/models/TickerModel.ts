class TickerModel {
    exchangeName: string;
    symbol: string;
    price: number;
    lastUpdateTime: Date;
    direction: string;

    constructor(exchangeName: string, symbol: string, price: number, lastUpdateTime: Date, direction: string = 'Same') {
        this.exchangeName = exchangeName;
        this.symbol = symbol;
        this.price = price;
        this.lastUpdateTime = lastUpdateTime;
        this.direction = direction;
    }
}

export default TickerModel;

