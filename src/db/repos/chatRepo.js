const daosFactory = require('../daosFactory');

module.exports = class chatRepo {
    constructor() {
        this.dao = new daosFactory().getDao('messages');
    }

    async save(obj) {
        return await this.dao.save(obj);
    };

    async getAll() {
        return await this.dao.getAll();
    };
};