import express from 'express';
import conn from '../models/connection';

class ClientRoutes {
    constructor() {
        this.router  = express.Router();
        this.init();

    }

    /**
     * Pega todas as chamadas e endereça para respectivo método
     */
    init() {
        this.router.get('/', this.getMainPage);
        this.router.get('/produtos', this.getAllProdutos)
    }

    async getMainPage(req, res, next) {
        try {
            const b = await conn.openConection();
            console.log(b);
            res.status(200).json({res: "abner"})
        } catch (error) {
            res.status(500).json({title: "Um erro ocorreu"})
        }
    }

    async getAllProdutos(req, res, next) {
        res.status(200).json({res: "abner"})
    }
}

const clientRouter = new ClientRoutes();
clientRouter.init();

export default new ClientRoutes().router;