class TickerModel {
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

    constructor(exchangeName: string,
        symbol: string,
        price: number,
        priceChange: number,
        pricePercentChange: number,
        openPrice: number,
        highPrice: number,
        lowPrice: number,
        closePrice: number,
        lastUpdateTime: Date,
        direction: string = 'Same') {
        this.exchangeName = exchangeName;
        this.symbol = symbol;
        this.price = price;
        this.priceChange = priceChange;
        this.priceChangePercent = pricePercentChange;
        this.openPrice = openPrice;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;
        this.closePrice = closePrice;
        this.lastUpdateTime = lastUpdateTime;
        this.direction = direction;
    }
}

export default TickerModel;

