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

    updateOne(exchange : any, callback: any){
        console.log(exchange);
        ExchangeModel.findOneAndUpdate({ _id: exchange.id },
            { $set: {  status: exchange.status } }, { new: true },
            function (err: any, result: any) {
                if (err) throw err;
            });
    }
}