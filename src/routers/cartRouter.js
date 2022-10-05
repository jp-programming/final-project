const Router = require('koa-router');
const cart = require('../controllers/cartController');

const cartRouter = new Router({
    prefix: '/cart'
});

cartRouter.get('/', cart.render);
cartRouter.get('/checkout', cart.checkout);

module.exports = cartRouter;