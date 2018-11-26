import ExchangeModel from "../models/ExchangeModel";

export class ExchangeManager {
    getAll(callback : any)  {
        ExchangeModel
            .find({})
            .exec(function (err: any, exchanges: any) {
                if(err) throw err;

                callback(exchanges);
            });
    }
}