const Router = require('koa-router');
const getRandomNumbers  = require('../controllers/randomController');    

const randomRouter = new Router({
    prefix: '/api/randoms'
});

randomRouter.get('/', getRandomNumbers);

module.exports = randomRouter;
