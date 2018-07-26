import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import clientRoutes from './src/client/routes/index';
import sellerRoutes from './src/seller/routes/index';

const dirname = process.cwd();

class App {
    constructor() {
        this.express = express();
        this.engineSetup();
        this.rotas();
    }

    engineSetup() {
        this.express.set('views', path.join(dirname, 'views'));
        this.express.set('view engine', 'pug');
        this.express.use(logger('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(cookieParser());
        this.express.use(express.static(path.join(dirname, 'public')));

        this.express.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
        
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
        
            // Pass to next layer of middleware
            next();
        });
    }

    rotas() {
        this.express.use('/cliente/', clientRoutes);
        this.express.use('/vendedor/', sellerRoutes);
    }
}

/**
 * exporta toda a aplicação express.
 */
export default new App().express
