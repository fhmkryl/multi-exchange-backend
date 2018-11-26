import ExchangeModel from "../models/ExchangeModel";

var mongoose = require("mongoose");

export class ExchangeController {
    constructor() { }

    public list(req: any, res: any) {
        ExchangeModel
            .find({})
            .exec(function (err: any, exchanges: any) {
                if(err) throw err;

                res.render('../views/exchange/list', {exchanges: exchanges});
            });
    }

    public createGet(req: any, res: any): any {
        res.render('../views/exchange/create');
    }

    public createPost(req: any, res: any): any {
        let exchangeReq = {
            name: req.body.name,
            serverTime: new Date(),
            status: 'Stopped'
        };
        let exchange = new ExchangeModel(exchangeReq);
        exchange.save(function (err: any) {
            if(err) throw err;

            res.redirect("/exchange/list");
        });
    }

    public updateGet(req: any, res: any): any {
        ExchangeModel.findOne({
            _id: req.params.id
        }).exec(function (err: any, exchange: any) {
            if (err) throw err;

            res.render('../views/exchange/update', { exchange: exchange });
        });
    }

    public updatePost(req: any, res: any): any {
        ExchangeModel.findOneAndUpdate({ _id: req.params.id },
            { $set: { name: req.body.name, status: req.body.status } }, { new: true },
            function (err: any, exchange: any) {
                if (err) throw err;

                res.redirect("/exchange/list");
            });
    }

    public deleteGet(req: any, res: any): any {
        ExchangeModel
            .findOne({ _id: req.params.id })
            .exec(function (err: any, exchange: any) {
                if(err) throw err;

                res.render("../views/exchange/delete", { exchange: exchange });
            });
    }

    public deletePost(req: any, res: any): any {
        ExchangeModel.findOneAndDelete({ _id: req.params.id }, (err: any, exchange: any) => {
            if (err) throw err;

            res.redirect('/exchange/list');
        });
    }
}
