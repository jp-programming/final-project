const logger = require('../lib/logger');
const products = require('../services/products');

const get = async ctx => {
    logger('info', `${ctx.method} ${ctx.request.originalUrl}`);
    const { id } = ctx.params;
    ctx.body = await products.get({ id });
};

const create = async ctx => {
    logger('info', `${ctx.request.method} ${ctx.request.originalUrl}`);
    const data = {
        name, price, thumbnail
    } = ctx.request.body;

    ctx.body = await products.create({ data });
};

const update = async ctx => {
    logger('info', `${ctx.request.method} ${ctx.request.originalUrl}`);
    const { id } = ctx.params;
    const data = {
        name, price, thumbnail
    } = ctx.request.body;

    ctx.body = await products.updateById({ id, data });
};

const remove = async ctx => {
    logger('info', `${ctx.request.method} ${ctx.request.originalUrl}`);
    const { id } = ctx.params;
    ctx.body = await products.deleteById({ id });
};

module.exports = {
    get, 
    create, 
    update, 
    remove
};