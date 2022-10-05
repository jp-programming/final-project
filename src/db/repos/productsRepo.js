const daosFactory = require('../daosFactory');

module.exports = class productsRepo {
    constructor() {
        this.dao = new daosFactory().getDao('products');
    }

    createTable(cb) {
        return this.dao.createTable(cb);
    };

    async getAll() {
        return await this.dao.getAll();
    };

    async getById(id){
        return await this.dao.getById(id);
    };

    async insert(row) {
        return await this.dao.insert(row);
    };

    async updateById(id, product) {
        return await this.dao.updateById(id, product);
    };

    async deleteById(id) {
        return await this.dao.deleteById(id);
    };
};
