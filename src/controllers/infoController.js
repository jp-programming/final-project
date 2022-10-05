const { cpus } = require('os');
const logger = require('../lib/logger');

const details = ctx => {
    logger('info', `${ctx.method} ${ctx.request.originalUrl}`);
    ctx.body = {
        'Argumentos de entrada': process.argv.slice(2),
        'Nombre de la plataforma (sistema operativo)': process.platform,
        'Versión de node.js': process.version,
        'Memoria total reservada (rss)': process.memoryUsage().rss,
        'Path de ejecución':  process.execPath,
        'Proccess id': process.pid,
        'Carpeta del proyecto': process.cwd(),
        'Número de CPUs': cpus().length,
    };
};

module.exports = {
    details,
    cpus
}