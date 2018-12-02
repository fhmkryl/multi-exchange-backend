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
            let exchangeApiManager = new ExchangeApiManager();
            var io = require('socket.io').listen(self.server);
            io
                .sockets
                .on('connection', function (socket: any) {
                    console.log('A client is connected!');

                    setInterval(function () {
                        socket.emit('onExchangesReceived', { exchangeList: self.simulateExchanges(exchanges) });
                    }, 2000);

                    socket.on('subscribe', (exchangeName: string) => {
                        exchangeApiManager.initMarkets(exchangeName);
                        setInterval(function () {
                            let tickers = exchangeApiManager.getTickers(exchangeName);
                            socket.emit('onTickersReceived', { tickerList: tickers });
                        }, 1000);
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