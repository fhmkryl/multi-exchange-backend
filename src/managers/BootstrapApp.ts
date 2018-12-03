import ExchangeApiManager from "../exchange-api/ExchangeApiManager";
import { ExchangeManager } from "./ExchangeManager";

export default class BootstrapApp {
    server: any;
    constructor(server: any) {
        this.server = server;
    }

    start = (): void => {
        let self = this;
        let manager = new ExchangeManager();
        manager.getAll().then((exchanges: any) => {
            var io = require('socket.io').listen(self.server);
            io
                .sockets
                .on('connection', function (socket: any) {
                    console.log('A client is connected!');

                    setInterval(function () {
                        socket.emit('onExchangesReceived', { exchangeList: self.simulateExchanges(exchanges) });
                    }, 2000);

                    socket.on('subscribe', (exchangeName: string) => {
                        let exchangeManager = new ExchangeManager();
                        exchangeManager.getAll().then((exchanges:any) => {
                            exchanges.forEach((exchangeItem:any) => {
                                if(exchangeItem.name === exchangeName){
                                    let exchangeApiManager = new ExchangeApiManager();
                                    exchangeApiManager.initMarkets(exchangeItem);
                                    setInterval(function () {
                                        let tickers = exchangeApiManager.getTickers(exchangeName);
                                        socket.emit('onTickersReceived', { tickerList: tickers });
                                    }, 1000);

                                    return;
                                } 
                            });
                        });
                    });

                    socket.on('disconnect', () => {
                        console.log('user disconnected');
                    })
                });
        });
    }

    simulateExchanges = (exchanges: any): any => {
        let updatedExchanges: any = [];
        exchanges.map((exchange: any, index: any, arr: any) => {
            if (exchange.status === 'Running') {
                exchange.serverTime = new Date();
            }

            updatedExchanges.push(exchange);
        });

        return updatedExchanges;
    }
}