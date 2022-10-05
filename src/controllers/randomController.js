const logger = require('../lib/logger');
const { fork } = require('child_process');

const getRandomNumbers = ctx => {
    logger('info', `${ctx.request.method} ${ctx.request.originalUrl}`);
    const { cant } = ctx.query;
    const child = fork('./src/lib/randomProcess.js');

    child.on('message', msg => {
        if(msg === 'start') child.send(Number(cant) || 100000000);
        else ctx.body = msg;
    });
};

module.exports = getRandomNumbers;
