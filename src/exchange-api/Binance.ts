import TickerModel from "../models/TickerModel";

const Binance = require('node-binance-api')().options({
    APIKEY: '5enQYcMQk2J3syHCao9xgJOnnPoGtDMhSRRAzG2Gxo90TBzXPG1itcXikQc2VRDh',
    APISECRET: 'uWJQXigS3AjftKe8c6xK2t3rkTqkmfeeNPwcycBLGXXsuU4eUvLkPY9qcOnB2UYI',
    useServerTime: true
});

let markets: any = [];
let tickerList: TickerModel [] = [];

Binance.initMarkets = () => {
    markets = [];
    Binance.prevDay(false, (error: any, prevDay: any) => {
        if (error) return console.log(error.body);
        
        for (let obj of prevDay) {
            let symbol = obj.symbol;

            if (!symbol.endsWith('BTC') && !symbol.endsWith('USDT')) continue;

            markets.push(symbol);
        }
    });

    Binance.websockets.trades(markets, (trades: any) => {
        let { e: eventType, E: eventTime, s: symbol, p: price, q: quantity, m: maker, a: tradeId } = trades;
        let newTicker = new TickerModel('Binance', symbol, price, eventTime);
        
        updateTickerList(newTicker);

        Binance.tickerList = tickerList;
    });
}

const updateTickerList = (newTicker : TickerModel) =>{
    if(tickerList.length === 0){
        tickerList.push(newTicker);
        return;
    }

    let existingTicker = tickerList.filter((item) => item.symbol === newTicker.symbol);
    if( existingTicker.length === 0){
        tickerList.push(newTicker);
        return;
    }

    tickerList.forEach((item) => {
        if(item.symbol === newTicker.symbol){
            if(newTicker.price > item.price){
                item.direction = 'Up';
            }
            else if(newTicker.price < item.price){
                item.direction = 'Down';
            }
            else{
                item.direction = 'Same';
            }
            item.price = newTicker.price;
            item.lastUpdateTime = newTicker.lastUpdateTime;
            return item;
        }
    });
}

export default Binance;