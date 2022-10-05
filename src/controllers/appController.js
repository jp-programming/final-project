const passport = require('koa-passport');
const logger = require('../lib/logger');
const LocalStrorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStrorage('./localStorage');

const render = async ctx => {
    logger('info', `${ctx.method} ${ctx.request.originalUrl}`);
    const user = {
        name,
        age,
        address,
        phone,
        email
    } = ctx.session.passport.user;

    localStorage.setItem('email', JSON.stringify(user.email));
    await ctx.render('main.ejs', user);
};

const register = async ctx => {
    logger('info', `${ctx.method} ${ctx.request.originalUrl}`);
    if(ctx.isAuthenticated()) ctx.redirect('/app');
    else await ctx.render('register.ejs');
};

const registerAuth = ctx => passport.authenticate('register', 
    { failureRedirect: '/app/register-error', successRedirect: '/app/login' })(ctx);

const registerError = async ctx => await ctx.render('register-error.ejs');

const login = async ctx => {
    logger('info', `${ctx.method} ${ctx.request.originalUrl}`);
    if(ctx.isAuthenticated()) ctx.redirect('/app');
    else await ctx.render('login.ejs');
};

const loginAuth = ctx => passport.authenticate('login', 
    { failureRedirect: '/app/login-error', successRedirect: '/app' })(ctx);

const loginError = async ctx => await ctx.render('login-error.ejs');

const logout = async ctx => {
    logger('info', `${ctx.method} ${ctx.request.originalUrl}`);
    await ctx.logout();
    localStorage.removeItem('email');
    ctx.session = null;
    ctx.redirect('/app/login');
};

const productTest = async ctx => {
    logger('info', `${ctx.method} ${ctx.request.originalUrl}`);
    await ctx.render('productsTest.ejs')
};

module.exports = {
    render,
    register,
    registerAuth,
    registerError,
    login,
    loginAuth,
    loginError,
    logout,
    productTest
};