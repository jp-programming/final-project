const logger = require('../../lib/logger');
const sqlite = require('../config/sqlite');
const knex = require('knex');

module.exports = class productsDao {
    static instance;
    
    constructor(tableName) {
        if(!productsDao.instance) {
            this.options = sqlite;
            this.knex = knex(this.options);
            this.tableName = tableName;
            productsDao.instance = this;
        }

        return productsDao.instance;
    };

    reconnect() {
        this.knex = knex(this.options);
    };

    createTable(cb) {
        return this.knex.schema.hasTable(this.tableName)
        .then(exists => {
            if (!exists) 
                return this.knex.schema.createTable(this.tableName, cb);
            else return false;
        })
        .then((res) => {
            res ? logger('info', `Table ${this.tableName} created`) 
            : logger('warn', `Table ${this.tableName} already exists`);
        })
        .catch((err) => {
            logger('error', err);
        })
        .finally(() => {
            this.close();
        });
    };

    async getAll() {
        this.reconnect();
        
        let res;
        try {
            res = await this.knex(this.tableName).select('*')
        } catch(err) {
            logger('error', err)
        };
        
        this.close();
        return res;
    };

    async getById(id){
        const data = await this.getAll() || null;
        const product = data.find(p => p.id === id);
        
        return product;
    };

    async insert(row) {
        this.reconnect();

        let id;
        try {
            id = await this.knex(this.tableName).insert(row);
        } catch(err) {
            logger('error', err);
        };
        
        this.close();
        return id?.[0];
    };

    async updateById(id, product) {
        this.reconnect();

        let res;
        try {
            res = await this.knex(this.tableName).where('id', '=', id).update(product);
        } catch(err) {
            logger('error', err);
        }

        this.close();
        return res;
    };

    async deleteById(id) {
        this.reconnect();

        let res;
        try {
            res = await this.knex(this.tableName).where('id', id).del();
        } catch(err) {
            logger('error', err);
        }

        this.close();
        return res;
    };

    close() {
        this.knex.destroy();
    };
}