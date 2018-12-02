import ExchangeModel from "../models/ExchangeModel";

export class ExchangeManager {
    getAll() {
        return ExchangeModel.find({}).lean(true).exec();
    }

    create(exchange : any, callback : any) {
        let newExchange = new ExchangeModel();
        newExchange.name = exchange.name;
        newExchange.serverTime = exchange.serverTime;
        newExchange.status = exchange.status;

        newExchange.save((err : any) => {
            if (err) 
                throw err;
            
            callback();
        });
    }

    update(exchange : any, callback : any) {
        ExchangeModel.findById(exchange._id, function(err: any, existingExchange: any) {
            if (err)
                throw err;

            if(exchange.name)
                existingExchange.name = exchange.name;

            if(exchange.serverTime)
                existingExchange.serverTime = exchange.serverTime;

            if(exchange.status)
                existingExchange.status = exchange.status;

            // save the bear
            existingExchange.save(function(err: any) {
                if (err)
                    throw err;

                callback(existingExchange);
            });

        });
    }
}