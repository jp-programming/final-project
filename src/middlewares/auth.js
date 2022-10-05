const auth = async (ctx, next) => {
    if (ctx.isAuthenticated()) await next(); 
    else ctx.redirect('/app/login');
}

module.exports = {
    auth
};