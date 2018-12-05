import ExchangeApiManager from "../exchange-api/ExchangeApiManager";
export default class BootstrapApp {
    server: any;
    exchangeApiManager: ExchangeApiManager;
    exchanges: any;
    constructor(server: any);
    start: () => void;
    private pollExchangesFromDb;
    private startPublishing;
    startConsuming: () => any;
    simulateExchanges: (exchanges: any) => any;
}
