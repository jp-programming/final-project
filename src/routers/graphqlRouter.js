const logger = require('../lib/logger');
const Router = require('koa-router');
const graphql = require('../controllers/graphqlController');

const graphqlRouter = new Router();

graphqlRouter.all('/graphql', graphql);

module.exports = graphqlRouter;