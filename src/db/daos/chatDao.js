const { normalize } = require('normalizr');
const { admin } = require('../config/Firebase.js');
const logger = require('../../lib/logger');
const chat = require('../models/chatModel');

module.exports = class chatDao {
    static instance;

    constructor(collName){
        if(!chatDao.instance) {
            this.db = admin.firestore();
            this.query = this.db.collection(collName);
            chatDao.instance = this;
        }

        return chatDao.instance;
    };

    async save(obj) {
        const newMessage = {
            author: {
                ...obj
            },
            text: obj.text,
            date: obj.date 
        }

        delete newMessage.author.text;
        delete newMessage.author.date;
        
        return await this.query.add(newMessage);
    }

    async getAll() {
        try {
            const messages = (await this.query.orderBy('date', 'asc').get()).docs
                .map(msg => ({ ...msg.data(), id: msg.id }));
            const data = { id: 'messages', messages };
    
            return normalize(data, chat);
        }   catch(err) {
            logger('error', err);
            return;
        }
    }
}