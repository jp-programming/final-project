const options = {
    client: 'sqlite3',
    connection: {
        filename: './src/db/ecommerce.sqlite'
    },
    useNullAsDefault: true
};

module.exports = options;