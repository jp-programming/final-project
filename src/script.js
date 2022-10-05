const productsRepo = require('./db/repos/productsRepo');

const pd = new productsRepo();

pd.createTable(
    (table) => {
        table.increments('id').primary();
        table.string('name', 50).notNullable();
        table.float('price').notNullable();
        table.string('thumbnail', 255).notNullable();
    }
);

module.exports = {
    pd
};