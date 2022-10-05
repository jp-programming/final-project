const mongoose = require('mongoose');

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    phone: String,
    email: String, 
    password: String
});

const User = mongoose.model(usersCollection, usersSchema);

module.exports = User;
