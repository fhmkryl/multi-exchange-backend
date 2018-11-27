import TickerModel from "../models/TickerModel";

const Binance = require('node-binance-api')().options({
    APIKEY: '5enQYcMQk2J3syHCao9xgJOnnPoGtDMhSRRAzG2Gxo90TBzXPG1itcXikQc2VRDh',
    APISECRET: 'uWJQXigS3AjftKe8c6xK2t3rkTqkmfeeNPwcycBLGXXsuU4eUvLkPY9qcOnB2UYI',
    useServerTime: true
});

let markets: any = [];
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
}

Binance.onReceivedTickers = (callback: any) => {
    Binance.websockets.trades(markets, (trades: any) => {
        let { e: eventType, E: eventTime, s: symbol, p: price, q: quantity, m: maker, a: tradeId } = trades;
        let ticker = new TickerModel('Binance', symbol, price, eventTime);

        callback(ticker);
    });
}

export default Binance;