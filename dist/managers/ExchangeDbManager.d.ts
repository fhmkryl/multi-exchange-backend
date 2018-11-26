import { ExchangeModel } from "../models/ExchangeModel";
export declare const seedExchanges: (db: any, exchanges: ExchangeModel[]) => void;
export declare const getAllExchanges: (callback: any) => ExchangeModel[];
export declare const bulkInsertExchanges: (db: any, exchanges: ExchangeModel[]) => void;
export declare const deleteAllExchanges: (db: any) => void;
export declare const insertExchange: (db: any, exchange: ExchangeModel) => void;
export declare const updateExchange: (db: any, exchange: ExchangeModel) => void;
