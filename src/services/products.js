const productsRepo = require('../db/repos/productsRepo');
const products = new productsRepo();

const get = async ({ id }) => {
    if(!id) return { products: await products.getAll() };
    
    const product = await products.getById(Number(id));
    if(!product) return { message: 'El id del producto no existe' };

    return { product };
};

const create = async ({ data }) => {
    const productId = await products.insert(data);
    if(!productId) return { message: 'El producto no pudo ser creado' };

    return { productId };
};

const updateById = async ({ id, data }) => {
    if(!id) return { message: 'Debe introducir un ID' };

    const productDB = await products.getById(Number(id));
    if(!productDB) return { message: 'El id del producto no existe' };

    const updated = await products.updateById(Number(id), data);
    return { beforeUpdate: productDB, updated };
};

const deleteById = async ({ id }) => {
    if(!id) return { message: 'Debe introducir un ID' };

    const productDB = await products.getById(Number(id));
    if(!productDB) return { message: 'El id del producto no existe' };

    const deleted = await products.deleteById(Number(id));
    return { beforeDelete: productDB, deleted };
};

module.exports = {
    get,
    create,
    updateById,
    deleteById
};
