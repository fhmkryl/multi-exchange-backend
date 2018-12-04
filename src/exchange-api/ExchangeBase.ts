var URL = require('url');
var HttpsProxyAgent = require('https-proxy-agent');
const fetch = require("node-fetch");
const WebSocket = require('ws');
import TickerModel from "../models/TickerModel";

const proxyUrl = 'http://10.0.7.224:8080';
abstract class ExchangeBase {
    proxyEnabled: boolean = false;
    public restApiBaseUrl: string;
    public wsBaseUrl : string;
    public webSocket : any;

    public symbols: string[];
    public tickerList: TickerModel [];

    constructor(restApiBaseUrl: string, wsBaseUrl: string){
        this.restApiBaseUrl = restApiBaseUrl;
        this.wsBaseUrl = wsBaseUrl;
        this.symbols = [];
        this.tickerList = [];
    }

    abstract async populateSymbols () : Promise<any>;

    createFetchRequest = async (url: string): Promise<any>  => {
        let self = this;
        if(self.proxyEnabled){
            return await fetch(url, {
                headers: {host: URL.parse(url).host},
                agent: new HttpsProxyAgent(self.getParsedProxyUrl(proxyUrl))
            });
        }

        return await fetch(url);
    } 

    createWebSocket = (query : string) : any => {
        let self = this;
        if(self.proxyEnabled){
            self.webSocket = new WebSocket(`${self.wsBaseUrl}/${query}`, {agent: new HttpsProxyAgent(self.getParsedProxyUrl(proxyUrl))});
        }
        else{
            self.webSocket = new WebSocket(`${self.wsBaseUrl}/${query}`);
        }

        self.webSocket.onerror = self.onWebSocketError;
    }

    onWebSocketError = (err: any): any => {
        console.log(err);
    }

    private getParsedProxyUrl  = (proxyUrl: string): string => {
        const parsedProxyURL = URL.parse(proxyUrl);
        parsedProxyURL.secureProxy = parsedProxyURL.protocol === 'https:';
        return parsedProxyURL;
    }

    abstract subscribe () : void;

    abstract listen () : void;

    abstract extractTickerFromResponse(response: any): TickerModel;

    updateTickerList = (newTicker : TickerModel) =>{
        let tickerList = this.tickerList;
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
}

export default ExchangeBase;