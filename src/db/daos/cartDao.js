const { mongo } = require('../config/MongoDB');
const logger = require('../../lib/logger');
const Cart = require('../models/cartModel');

module.exports = class cartDao {
    static instance;
    
    constructor(){
        if(!cartDao.instance) {
            this.db = mongo;
            cartDao.instance = this;
        }

        return cartDao.instance;
    };

    async save({ email, product }){
        this.db.connection();
        
        try {
            const data = await this.getByEmail(email);
            
            let _id = data?._id;
            if(!data) {
                const newCart = {
                    email,
                    products: [],
                    total: 0.00
                };
                
                _id = await Cart.create(newCart);
            }
            
            const dbProduct = data && data.products.find(p => p.id === product.id);
            const price = Number((product.price).toFixed(2));
            if(dbProduct) {
                await Cart.updateOne({ _id: _id, "products.id": dbProduct.id }, { $inc: { 
                    total: price, 
                    "products.$.quantity": 1,
                    "products.$.subTotal": price
                }});

                return
            } else {
                await Cart.updateOne({ _id: _id }, { 
                    $push: { 
                        products: {
                            id: product.id,
                            name: product.name,
                            quantity: 1,
                            subTotal: price
                        }
                    },
                    $inc: {
                        total: price
                    }
                });
                
                return _id;
            }
        } catch (error) {
            logger('error', error);
        }
    };

    async getByEmail(email){
        this.db.connection();

        try {
            const data = await Cart.findOne({ email: email }, { __v: 0 });
            
            return data;
        } catch (error) {
            logger('error', error);
        }
    };

    async getAll(email){
        this.db.connection();

        try {
            const data = await this.getByEmail(email);
            const cart = data 
                ? { products: data.products, total: Number((data.total).toFixed(2)) } 
                : { products: [], total: 0.00 };

            return cart;
        } catch (error) {
            logger('error', error);
        }
    };

    async removeItemCart({ email, id }) {
        this.db.connection();

        try {
            const data = await this.getByEmail(email);
            
            const subTotal = -Number((data.products.find(p => p.id === id).subTotal).toFixed(2));
            await Cart.updateOne({ _id: data._id}, { 
                $pull: { products: { id: id } },
                $inc: { total: subTotal }
            });
        } catch (error) {
            logger('error', error);
        }
    }

    async clearCart(email) {
        this.db.connection();

        try {
            const data = await this.getByEmail(email);
            
            await Cart.updateOne({ _id: data._id }, { 
                products: [],
                total: 0.00
            });
        } catch (error) {
            logger('error', error);
        }
    }
};