const WebSocket = require('ws');
const fetch = require("node-fetch");
import TickerModel from "../models/TickerModel";
import ExchangeBase from "./ExchangeBase";


var pairIds: any = {7:"BTC_BCN",14:"BTC_BTS",15:"BTC_BURST",20:"BTC_CLAM",25:"BTC_DGB",27:"BTC_DOGE",24:"BTC_DASH",38:"BTC_GAME",43:"BTC_HUC",50:"BTC_LTC",51:"BTC_MAID",58:"BTC_OMNI",61:"BTC_NAV",64:"BTC_NMC",69:"BTC_NXT",75:"BTC_PPC",89:"BTC_STR",92:"BTC_SYS",97:"BTC_VIA",100:"BTC_VTC",108:"BTC_XCP",114:"BTC_XMR",116:"BTC_XPM",117:"BTC_XRP",112:"BTC_XEM",148:"BTC_ETH",150:"BTC_SC",155:"BTC_FCT",162:"BTC_DCR",163:"BTC_LSK",167:"BTC_LBC",168:"BTC_STEEM",170:"BTC_SBD",171:"BTC_ETC",174:"BTC_REP",177:"BTC_ARDR",178:"BTC_ZEC",182:"BTC_STRAT",184:"BTC_PASC",185:"BTC_GNT",189:"BTC_BCH",192:"BTC_ZRX",194:"BTC_CVC",196:"BTC_OMG",198:"BTC_GAS",200:"BTC_STORJ",201:"BTC_EOS",204:"BTC_SNT",207:"BTC_KNC",210:"BTC_BAT",213:"BTC_LOOM",221:"BTC_QTUM",232:"BTC_BNT",229:"BTC_MANA",121:"USDT_BTC",216:"USDT_DOGE",122:"USDT_DASH",123:"USDT_LTC",124:"USDT_NXT",125:"USDT_STR",126:"USDT_XMR",127:"USDT_XRP",149:"USDT_ETH",219:"USDT_SC",218:"USDT_LSK",173:"USDT_ETC",175:"USDT_REP",180:"USDT_ZEC",217:"USDT_GNT",191:"USDT_BCH",220:"USDT_ZRX",203:"USDT_EOS",206:"USDT_SNT",209:"USDT_KNC",212:"USDT_BAT",215:"USDT_LOOM",223:"USDT_QTUM",234:"USDT_BNT",231:"USDT_MANA",129:"XMR_BCN",132:"XMR_DASH",137:"XMR_LTC",138:"XMR_MAID",140:"XMR_NXT",181:"XMR_ZEC",166:"ETH_LSK",169:"ETH_STEEM",172:"ETH_ETC",176:"ETH_REP",179:"ETH_ZEC",186:"ETH_GNT",190:"ETH_BCH",193:"ETH_ZRX",195:"ETH_CVC",197:"ETH_OMG",199:"ETH_GAS",202:"ETH_EOS",205:"ETH_SNT",208:"ETH_KNC",211:"ETH_BAT",214:"ETH_LOOM",222:"ETH_QTUM",233:"ETH_BNT",230:"ETH_MANA",224:"USDC_BTC",226:"USDC_USDT",225:"USDC_ETH"};
var codeConversion: any = {BTC_ETH:"ETHBTC",USDT_BTC:"BTCUSD",USDT_LTC:"LTCUSD",USDT_ETH:"LTCETH",USDT_XRP:"XRPUSD",USDT_DASH:"DASHUSD",USDT_XMR:"XMRUSD",USDT_ZEC:"ZECUSD",USDT_NXT:"NXTUSD",BTC_LTC:"LTCBTC",BTC_DASH:"DASHBTC",BTC_POT:"POTBTC",BTC_XMR:"XMRBTC",BTC_DOGE:"DOGEBTC",BTC_ZEC:"ZECBTC",BTC_XLM:"XLMBTC",BTC_ETC:"ETCBTC",BTC_MAID:"MAIDBTC",BTC_XEM:"XEMBTC",BTC_BTS:"BTSBTC",BTC_BCH:"BCHBTC",USDT_BCH:"BCHUSD",BTC_XRP:"XRPBTC"};
export default class Poloniex extends ExchangeBase {

    ws = new WebSocket('wss://api.bitfinex.com/ws');
    channelSymbolMap: any = {};

    constructor() {
        super();
    }

    public async populateSymbols(){
        let self = this;
        await fetch('https://api.binance.com/api/v3/ticker/price')
        .then((response:any) => {
            return response.json();
        })
        .then((result: any) => {
            let index = 0;
            result.forEach((item:any) => {
                self.symbols.push(item.symbol);
            });
        });
    }

    public subscribe() {
        let self = this;
        self.ws = new WebSocket('wss://api2.poloniex.com');
        self.ws.onopen = function () {
            var query = {
                "command": "subscribe",
                "channel": 1002
              };
              
            self.ws.send(JSON.stringify(query));
        };
    }

    public listen(onTickerReceived: any) {
        let self = this;
        self.ws.onmessage = function (msg: any) {
            try {
                let data = JSON.parse(msg.data);
                let channelId = data[2][0];
                let tmpSymbol = pairIds[channelId];
                let symbol = codeConversion[tmpSymbol];
                if(symbol){
                    if (symbol.endsWith('USD')) {
                        symbol = symbol + 'T';
                    }
                    let price = data[2][1];
                    let ticker = new TickerModel('Poloniex', symbol, price, new Date());
    
                    self.updateTickerList(ticker);
    
                    onTickerReceived(ticker); 
                }   
            } catch {
                
            }
        };
    }
}