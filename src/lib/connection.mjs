import r from 'rethinkdb';

class Db_Conection {

    constructor() {
        this.settings();
    }

    openConection() {
        return new Promise((resolve, reject) => {
            r.connect({host: process.env.DB_HOST, port: process.env.DB_PORT, db: process.env.DB_NAME}, (err, conn) => {
                if ( err ) {
                    return reject(err);
                }
                resolve(conn);
            });
        });
    }

    closeConection(req, res, next) {
       
    }

    async settings() {
        try {
            let dbExist = await this._settings_checkDbExist();
            if(dbExist) {
                let tablesExist = await this._settings_checkTablesExist();
                console.log('tablesExist: ' + tablesExist);
                
            }else {
                let createDb = await this._create_rootDb();
            }
        } catch (e) {
           console.log(e);
           
        }
    }

    _settings_checkDbExist() {
        return new Promise((resolve, reject) => {
            r.connect({host: process.env.DB_HOST, port: process.env.DB_PORT}, (err, conn) => {
                if (err) {
                    reject(err);
                }
                r.dbList().contains(process.env.DB_NAME).run(conn).then((res) => {
                    resolve(res);
                })
            })
        })
    }

    _create_rootDb() {
        return new Promise((resolve, reject) => {
            r.connect({host: process.env.DB_HOST, port: process.env.DB_PORT}, (err, conn) => {
                if (err) {
                    reject(err);
                }
                r.dbCreate(process.env.DB_NAME).run(conn).then(() => {
                    resolve(true);
                })
            })
        })
    }

    /**
     * Função vai checar a existencia de todas as tabelas que devem existir no banco de dados
     */
    async _settings_checkTablesExist() {
        
        //tabela Produto
        let existTableProduto = await this._settings_checkExistTableProduto();
        if(existTableProduto == false) {
           try {
            await this._settings_createTableProduto();
           } catch (error) {
               console.log(error);
           }
        }
        existTableProduto = await this._settings_checkExistTableProduto();
        
        return new Promise((resolve, reject) => {
            if(existTableProduto) {
                resolve(true)
            }else {
                reject(false)
            }
        })
    }

    async _settings_checkExistTableProduto() {
        let conn = await this.openConection();
        return new Promise((resolve) => {
            r.tableList().contains("produto").run(conn).then((res) => {
                resolve(res);
            })
        })
    }

    async _settings_createTableProduto() {
        let conn = await this.openConection();
        return new Promise((resolve, reject) => {
            r.tableCreate("produto").run(conn).then((err, res) => {
                if(err) {
                    reject(false);
                }
                resolve(true);
            })
        })
    }

}

export default Db_Conection;
