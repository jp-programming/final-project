const logger = require('../lib/logger');
const doCheckout = require('../services/cart')

const render = async ctx => {
    logger('info', `${ctx.method} ${ctx.request.originalUrl}`);
    const user = {
        name,
        age,
        address,
        phone,
        email
    } = ctx.session.passport.user;
    
    await ctx.render('cart.ejs', user);
};

const checkout = async ctx => {
    logger('info', `${ctx.method} ${ctx.request.originalUrl}`);
    const user = {
        name,
        phone,
        email
    } = ctx.session.passport.user;

    const isCheckout = await doCheckout(user);

    isCheckout 
        ? ctx.redirect('/app/cart')
        : ctx.redirect('/app');
};

module.exports = {
    render,
    checkout
};