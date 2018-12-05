import ExchangeApiManager from "../exchange-api/ExchangeApiManager";
import { ExchangeManager } from "./ExchangeManager";

export default class BootstrapApp {
    server: any;
    exchangeApiManager: ExchangeApiManager;
    exchanges: any;
    constructor(server: any) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        this.server = server;

        this.exchanges = [];
        this.exchangeApiManager = new ExchangeApiManager();

        this.start();
    }

    start = (): void => {
        let self = this;

        self.pollExchangesFromDb();

        self.startPublishing();

        self.startConsuming();
    }

    private pollExchangesFromDb = (): any => {
        let self = this;
        setInterval(() => {
            let manager = new ExchangeManager();
            manager.getAll().then((exchanges: any) => {
                self.exchanges = exchanges;
            });
        }, 1000);
    }

    private startPublishing = (): any => {
        let self = this;
        var io = require('socket.io').listen(self.server);
        io
            .sockets
            .on('connection', function (socket: any) {
                console.log('A client is connected!');

                setInterval(function () {
                    socket.emit('onExchangesReceived', { exchangeList: self.simulateExchanges(self.exchanges) });
                }, 2000);

                socket.on('subscribeToExchange', (exchangeName: string) => {
                    setInterval(function () {
                        let tickers = self.exchangeApiManager.getTickersByExchange(exchangeName);
                        socket.emit('onTickersReceivedByExchange', { tickerList: tickers });
                    }, 1000);
                });

                socket.on('subscribeToSymbol', (symbol: string) => {
                    setInterval(function () {
                        let tickers = self.exchangeApiManager.getTickersBySymbol(symbol);
                        socket.emit('onTickersReceivedBySymbol', { tickerList: tickers });
                    }, 1000);
                });

                socket.on('disconnect', () => {
                    console.log('user disconnected');
                });
            });
    }

    startConsuming = (): any => {
        let self = this;
        setInterval(() => {
            try {
                self.exchanges.forEach((exchangeItem: any) => {
                    if (exchangeItem.status === 'Running') {
                        if(!self.exchangeApiManager.exchangeSockets[exchangeItem.name]){
                            self.exchangeApiManager.start(exchangeItem);
                        }
                    }
                    else {
                        self.exchangeApiManager.stop(exchangeItem);
                    }
                });
            }
            catch (err) {
                console.log('Unable to start stream ', err);
            }
        }, 1000);
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