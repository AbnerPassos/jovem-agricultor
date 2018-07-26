import DB_Conn from '../../lib/connection'

class Db_Seller extends DB_Conn {
    constructor() {
        super();
    }

    async getAllProducts() {
        try {
           const b = await this.openConection();
           return new Promise((resolve) => {
               resolve(b);
           })
            
        } catch (e) {
            console.log('db seller erro');
            
        }
    }
    
}

export default new Db_Seller();
