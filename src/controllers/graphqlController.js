const { graphqlHTTP } = require('koa-graphql');
const { buildSchema } = require('graphql');
const products = require('../services/products');

const schema = buildSchema(`
    type Product {
        id: ID!
        name: String
        price: Float
        thumbnail: String
    } 

    type Products {
        products: [Product]
    }

    type ProductById {
        product: Product
    }

    type ProductId {
        productId: ID!
    }

    type ProductUpdated { 
        beforeUpdate: Product
        updated: Int
    }

    type ProductDeleted { 
        beforeDelete: Product
        deleted: Int
    }

    input ProductInput {
        name: String
        price: Float
        thumbnail: String
    }

    type Query {
        getProducts: Products
        getProductById(id: ID!): ProductById
    }

    type Mutation {
        addProduct(data: ProductInput!): ProductId
        updateProductById(id: ID!, data: ProductInput!): ProductUpdated
        deleteProductById(id: ID!): ProductDeleted
    }
`);

const graphQL = graphqlHTTP({
    schema,
    rootValue: {
        getProducts: products.get,
        getProductById: products.get,
        addProduct: products.create,
        updateProductById: products.updateById,
        deleteProductById: products.deleteById
    },
    graphiql: true,
});

module.exports = graphQL;