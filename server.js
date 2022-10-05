require('dotenv').config();
const logger = require('./src/lib/logger');
const { mongo } = require('./src/db/config/MongoDB');
const passport = require('./src/services/passport');
const socketHandler = require('./src/lib/socket.js');

const appRouter = require('./src/routers/appRouter');
const randomRouter = require('./src/routers/randomRouter');
const { infoRouter, cpus } = require('./src/routers/infoRouter');
const graphqlRouter = require('./src/routers/graphqlRouter');

const Koa = require('koa');
const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static');
const views = require('koa-views');
const cors = require('@koa/cors');
const compress = require('koa-compress');
const parseArgs = require('minimist');
const session = require('koa-session');
const MongooseStore = require('koa-session-mongoose');
const cluster = require('cluster');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = new Koa();
const httpServer = new HttpServer(app.callback());
const io = new IOServer(httpServer);

const options = { 
    alias: { p: "PORT", mode: "MODE" }, 
    default: { PORT: process.env.PORT || 8080, MODE: "FORK" } 
};

const { PORT, MODE } = parseArgs(process.argv.slice(2), options);

if(MODE === 'CLUSTER' && cluster.isPrimary) {
    const numCpus = cpus().length;
    
    logger('info', `Cluster mode: ${numCpus} CPUs`);

    cluster.on('online', (worker) => {
        logger('info', `Worker ${worker.process.pid} is online`);
    });

    for(let i = 0; i < numCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        logger('info', `Worker ${process.pid} terminado`);
        cluster.fork();
    });
} else {
    mongo.connection();
    app.use(cors());
    app.use(koaBody());
    app.use(bodyParser());
    app.use(serve('./public'));
    app.keys = ['secretNotSecret'];
    app.use(session({
        store: new MongooseStore({
            collection: 'sessions',
            expires: 600
        })
    }, app));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(compress());
    app.use(views('./src/views', { map: { html: 'ejs' } }));

    app.use(appRouter.routes());
    app.use(graphqlRouter.routes());
    app.use(infoRouter.routes());
    app.use(randomRouter.routes());
    
    app.use(async(ctx, next) => {
        try {
            await next()
            const status = ctx.status || 404
            if (status === 404) {
                ctx.throw(404)
            }
        } catch (err) {
            ctx.status = err.status || 500
            if (ctx.status === 404) {
                logger('warn', `${ctx.method} ${ctx.request.originalUrl} not found`);
                ctx.body = '404 Page Not found';
            } 
        }
    });
    
    io.on('connection', async socket => await socketHandler(socket));

    const server = httpServer.listen(PORT, () => logger('info', `Server started on port ${PORT}`));
    server.on('error', (err) => logger('error', err));
}