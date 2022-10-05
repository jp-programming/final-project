const Router = require('koa-router');
const products = require('../controllers/productsController');

const productsRouter = new Router({
    prefix: '/products'
});

productsRouter.get('/:id?', products.get);
productsRouter.post('/', products.create);
productsRouter.put('/:id?', products.update);
productsRouter.delete('/:id?', products.remove);

module.exports = productsRouter;