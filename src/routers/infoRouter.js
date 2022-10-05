const Router = require('koa-router');
const { details, cpus } = require('../controllers/infoController');

const infoRouter = new Router({
    prefix: '/info'
})

infoRouter.get('/', details);

module.exports = {
    infoRouter,
    cpus
};