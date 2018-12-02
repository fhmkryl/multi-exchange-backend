import TickerModel from "../models/TickerModel";

abstract class ExchangeBase {
    public symbols: string[];
    public tickerList: TickerModel [];

    constructor(){
        this.symbols = [];
        this.tickerList = [];
    }

    abstract async populateSymbols () : Promise<any>;

    abstract subscribe () : void;

    abstract listen (onTickerReceived: any) : void;

    getSymbols = () : string[] => {
        return this.symbols;
    }

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