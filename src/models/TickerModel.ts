class TickerModel {
    exchangeName : string;
    symbol : string;
    price: number;
    lastUpdateTime : string;

    constructor(exchangeName: string, symbol: string, price : number, lastUpdateTime: string){
        this.exchangeName = exchangeName;
        this.symbol = symbol;
        this.price = price;
        this.lastUpdateTime = lastUpdateTime;
    }
}

export default TickerModel;

