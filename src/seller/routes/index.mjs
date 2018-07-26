import express from 'express';
import Db_Seller from '../models/index';

class sellerRoutes {

    constructor() {
        this.router  = express.Router();
        this.init();
    }

    /**
     * Pega todas as chamadas e endereça para respectivo método
     */
    init() {
        this.router.get('/', this.getMainPage);
    }

    async getMainPage(req, res, next) {
        // const p = await Db_Seller.getAllProducts();
        // console.log(p);
        
        res.status(200).json({res: "bb"})
    }
}

const sellerRouter = new sellerRoutes();
sellerRouter.init();

export default new sellerRoutes().router;