const WebSocket = require('ws');
const fetch = require("node-fetch");
import TickerModel from "../models/TickerModel";
import ExchangeBase from "./ExchangeBase";

//const symbols = ["btcusd", "ltcusd", "ltcbtc", "ethusd", "ethbtc", "etcbtc", "etcusd", "rrtusd", "rrtbtc", "zecusd", "zecbtc", "xmrusd", "xmrbtc", "dshusd", "dshbtc", "btceur", "btcjpy", "xrpusd", "xrpbtc", "iotusd", "iotbtc", "ioteth", "eosusd", "eosbtc", "eoseth", "sanusd", "sanbtc", "saneth", "omgusd", "omgbtc", "omgeth", "neousd", "neobtc", "neoeth", "etpusd", "etpbtc", "etpeth", "qtmusd", "qtmbtc", "qtmeth", "avtusd", "avtbtc", "avteth", "edousd", "edobtc", "edoeth", "btgusd", "btgbtc", "datusd", "datbtc", "dateth", "qshusd", "qshbtc", "qsheth", "yywusd", "yywbtc", "yyweth", "gntusd", "gntbtc", "gnteth", "sntusd", "sntbtc", "snteth", "ioteur", "batusd", "batbtc", "bateth", "mnausd", "mnabtc", "mnaeth", "funusd", "funbtc", "funeth", "zrxusd", "zrxbtc", "zrxeth", "tnbusd", "tnbbtc", "tnbeth", "spkusd", "spkbtc", "spketh", "trxusd", "trxbtc", "trxeth", "rcnusd", "rcnbtc", "rcneth", "rlcusd", "rlcbtc", "rlceth", "aidusd", "aidbtc", "aideth", "sngusd", "sngbtc", "sngeth", "repusd", "repbtc", "repeth", "elfusd", "elfbtc", "elfeth", "btcgbp", "etheur", "ethjpy", "ethgbp", "neoeur", "neojpy", "neogbp", "eoseur", "eosjpy", "eosgbp", "iotjpy", "iotgbp", "iosusd", "iosbtc", "ioseth", "aiousd", "aiobtc", "aioeth", "requsd", "reqbtc", "reqeth", "rdnusd", "rdnbtc", "rdneth", "lrcusd", "lrcbtc", "lrceth", "waxusd", "waxbtc", "waxeth", "daiusd", "daibtc", "daieth", "cfiusd", "cfibtc", "cfieth", "agiusd", "agibtc", "agieth", "bftusd", "bftbtc", "bfteth", "mtnusd", "mtnbtc", "mtneth", "odeusd", "odebtc", "odeeth", "antusd", "antbtc", "anteth", "dthusd", "dthbtc", "dtheth", "mitusd", "mitbtc", "miteth", "stjusd", "stjbtc", "stjeth", "xlmusd", "xlmeur", "xlmjpy", "xlmgbp", "xlmbtc", "xlmeth", "xvgusd", "xvgeur", "xvgjpy", "xvggbp", "xvgbtc", "xvgeth", "bciusd", "bcibtc", "mkrusd", "mkrbtc", "mkreth", "kncusd", "kncbtc", "knceth", "poausd", "poabtc", "poaeth", "lymusd", "lymbtc", "lymeth", "utkusd", "utkbtc", "utketh", "veeusd", "veebtc", "veeeth", "dadusd", "dadbtc", "dadeth", "orsusd", "orsbtc", "orseth", "aucusd", "aucbtc", "auceth", "poyusd", "poybtc", "poyeth", "fsnusd", "fsnbtc", "fsneth", "cbtusd", "cbtbtc", "cbteth", "zcnusd", "zcnbtc", "zcneth", "senusd", "senbtc", "seneth", "ncausd", "ncabtc", "ncaeth", "cndusd", "cndbtc", "cndeth", "ctxusd", "ctxbtc", "ctxeth", "paiusd", "paibtc", "seeusd", "seebtc", "seeeth", "essusd", "essbtc", "esseth", "atmusd", "atmbtc", "atmeth", "hotusd", "hotbtc", "hoteth", "dtausd", "dtabtc", "dtaeth", "iqxusd", "iqxbtc", "iqxeos", "wprusd", "wprbtc", "wpreth", "zilusd", "zilbtc", "zileth", "bntusd", "bntbtc", "bnteth", "absusd", "abseth", "xrausd", "xraeth", "manusd", "maneth", "bbnusd", "bbneth", "niousd", "nioeth", "dgxusd", "dgxeth", "vetusd", "vetbtc", "veteth", "utnusd", "utneth", "tknusd", "tkneth", "gotusd", "goteur", "goteth", "xtzusd", "xtzbtc", "cnnusd", "cnneth", "boxusd", "boxeth", "trxeur", "trxgbp", "trxjpy", "mgousd", "mgoeth", "rteusd", "rteeth", "yggusd", "yggeth", "mlnusd", "mlneth", "wtcusd", "wtceth", "csxusd", "csxeth", "omnusd", "omnbtc", "intusd", "inteth", "drnusd", "drneth", "pnkusd", "pnketh", "dgbusd", "dgbbtc", "bsvusd", "bsvbtc", "babusd", "babbtc", "wlousd", "wloxlm", "vldusd", "vldeth", "enjusd", "enjeth", "onlusd", "onleth", "rbtusd", "rbtbtc", "ustusd", "euteur", "eutusd"];

export default class Bitfinex extends ExchangeBase {

    ws = new WebSocket('wss://api.bitfinex.com/ws');
    channelSymbolMap: any = {};

    constructor() {
        super();
    }

    public async populateSymbols(){
        let self = this;
        await fetch('https://api.bitfinex.com/v1/symbols')
        .then((response:any) => {
            return response.json();
        })
        .then((result: any) => {
            result.forEach((symbol:string) => {
                self.symbols.push(symbol);
            });
        });
    }

    public subscribe() {
        let self = this;
        self.ws.onopen = function () {
            self.symbols.forEach((item: string, index: number, arr) => {
                self.ws.send(JSON.stringify({ "event": "subscribe", "channel": "ticker", "pair": item }));
            });
        };
    }

    public listen(onTickerReceived: any) {
        let self = this;
        self.ws.onmessage = function (msg: any) {
            var response = JSON.parse(msg.data);
            if (response.event === 'subscribed') {
                self.channelSymbolMap[response.chanId] = response.pair;
            }

            var hb = response[1];
            if (hb != "hb" && response.event !== 'subscribed' && self.channelSymbolMap[response[0]]) {
                let symbol = self.channelSymbolMap[response[0]];
                if (symbol.endsWith('USD')) {
                    symbol = symbol + 'T';
                }
                let price = response[7];
                let ticker = new TickerModel('Bitfinex', symbol, price, new Date());

                self.updateTickerList(ticker);

                onTickerReceived(ticker);
            }
        };
    }
}