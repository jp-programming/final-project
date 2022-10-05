const mongoose = require('mongoose');

const cartCollection = 'cart';

const cartSchema = new mongoose.Schema({
    email: String,
    products: [{
        id: Number,
        name: String,
        quantity: Number,
        subTotal: Number
    }],
    total: Number
});

const Cart = mongoose.model(cartCollection, cartSchema);

module.exports = Cart;