const logger = require('./logger');
const { pd } = require('../script');
const { createProducts } = require('./fakerProducts');
const chatRepo = require('../db/repos/chatRepo');
const daosFactory = require('../db/daosFactory');
const LocalStrorage = require('node-localstorage').LocalStorage;

const localStorage = new LocalStrorage('./localStorage');
const chat = new chatRepo();
const cart = new daosFactory().getDao('cart');

const socketHandler = async socket => {
    logger('info', 'Client connected');
    const email = JSON.parse(localStorage.getItem('email'));

    socket.emit('products', await pd.getAll());
    socket.emit('messages', await chat.getAll());
    socket.emit('productsTest', createProducts());
    socket.emit('cartItems', await cart.getAll(email));

    socket.on('new-product', async product => {
        await pd.insert(product);
        io.sockets.emit('products', await pd.getAll());
    });

    socket.on('new-message', async message => {
        await chat.save(message);
        io.sockets.emit('messages', await chat.getAll());
    });

    socket.on('cart', async product => {
        const info = { email, product };
        await cart.save(info)
        socket.emit('cartItems', await cart.getAll(email));
    });

    socket.on('removeItemCart', async id => {
        const info = { email, id };
        await cart.removeItemCart(info)
        socket.emit('cartItems', await cart.getAll(email));
    });
};

module.exports = socketHandler;