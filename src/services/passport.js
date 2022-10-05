const bcrypt = require('bcrypt');
const passport = require('koa-passport');
const { Strategy: LocalStrategy } = require('passport-local');

const daosFactory = require('../db/daosFactory');
const { sendRegisterEmail } = require('../lib/mailer');

const users = new daosFactory().getDao('users');

passport.use('register', new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email', passwordField: 'password' },
    async (ctx, email, password, done) => {
        const user = await users.getByEmail(email);

        if (user) return done(null, false, { message: 'User already exists' });

        return bcrypt.hash(password, 10, async (err, hash) => {
            if (err) return done(err);

            const userInfo = {
                name,
                age,
                address,
                phone,
                email
            } = ctx.request.body;

            sendRegisterEmail(userInfo);

            const _id = await users.save({ 
                ...userInfo,
                password: hash 
            });
            const user = { _id, email, password };

            return done(null, user);
        });
    }
));

passport.use('login', new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
        const user = await users.getByEmail(email);
        
        if (!user) return done(null, false, { message: 'User not found' });
        
        return bcrypt.compare(password, user.password, (err, res) => {
            if (err) return done(err);
            if (!res) return done(null, false, { message: 'Wrong password' });
            
            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
