import r from 'rethinkdb';

class Db_Conection {

    openConection() {
        return new Promise((resolve, reject) => {
            r.connect({host: process.env.DB_HOST, port: process.env.DB_PORT}, (err, conn) => {
                if ( err ) {
                    return reject(err);
                }
                resolve(conn);
            });
        });
    }

    closeConection(req, res, next) {
       console.log('aqui');
       
    }
}

export default new Db_Conection();
