const productsDao = require('./daos/productsDao');
const usersDao = require('./daos/usersDao');
const cartDao = require('./daos/cartDao');
const chatDao = require('./daos/chatDao');

module.exports = class daosFactory {
    static instance;

    constructor() {
        if(!daosFactory.instance) daosFactory.instance = this;
        return daosFactory.instance;
    }

    getDao(dao) {
        if(dao === 'products') return new productsDao(dao);
        if(dao === 'users') return new usersDao();
        if(dao === 'cart') return new cartDao();
        
        return new chatDao(dao);
    }
}