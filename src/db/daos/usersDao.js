const { mongo } = require('../config/MongoDB');
const logger = require('../../lib/logger');
const User = require('../models/userModel');

module.exports = class usersDao {
    static instance;

    constructor(){
        if(!usersDao.instance) {
            this.db = mongo;
            usersDao.instance = this;
        }

        return usersDao.instance;
    };

    async save(obj){
        this.db.connection();
        
        try {
            const { _id } = await User.create(obj);

            return _id;
        } catch (error) {
            logger('error', error);
        }
    };

    async getById(id){
        this.db.connection();

        try {
            const data = await User.findById(id, { __v: 0 });

            return data;
        } catch (error) {
            logger('error', error);
        }
    };

    async getByEmail(email){
        this.db.connection();

        try {
            const data = await User.findOne({ email: email }, { __v: 0 });
            
            return data;
        } catch (error) {
            logger('error', error);
        }
    };

    async getAll(){
        this.db.connection();

        try {
            const data = await User.find();
        
            return data;
        } catch (error) {
            logger('error', error);
        }

        return;
    };
};