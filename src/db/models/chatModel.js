const { schema } = require('normalizr');

const authorSchema = new schema.Entity('authors');
const messageSchema = new schema.Entity('messages', { 
    author: authorSchema
});
const chat = new schema.Entity('chat', { 
    messages: [messageSchema]
});

module.exports = chat;