const supertest = require('supertest');
const { expect } = require('chai');

const request = supertest('http://localhost:8080/app/products');

describe('Products API test', () => {
    describe('GET', () => {
        it('devuelve un mensaje en caso de que no exista el producto', async () => {
            const res = await request.get('/5');
            expect(res.body).to.eql({ message: 'El id del producto no existe' });
        });

        it('devuelve todos los productos si no se pasa un id', async () => {
            const res = await request.get('/');
            expect(res.body).to.eql({
                products: [
                  {
                    id: 1,
                    name: 'Calculadora',
                    price: 213.9,
                    thumbnail: 'https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_calculator-256.png'  
                  },
                  {
                    id: 2,
                    name: 'Regla',
                    price: 500,
                    thumbnail: 'https://cdn0.iconfinder.com/data/icons/fitness-95/24/height-measurement-256.png'
                  }
                ]
            });
        });

        it('devuelve un producto si coincide el id', async () => {
            const res = await request.get('/2');
            expect(res.body).to.eql({
                "product": {
                  "id": 2,
                  "name": "Regla",
                  "price": 500,
                  "thumbnail": "https://cdn0.iconfinder.com/data/icons/fitness-95/24/height-measurement-256.png"
                }
            });
        });
    });

    describe('POST', () => {
        const product = {
            name: 'Mesa',
            price: 400,
            thumbnail: 'https://via.placeholder.com/150'
        };

        it('devuelve un mensaje si no se pasa el producto', async () => {
            const res = await request.post('/');
            expect(res.body).to.eql({ message: 'El producto no pudo ser creado' });
        });

        it('devuelve el id del producto creado', async () => {
            const res = await request.post('/').send(product);
            expect(res.body).to.eql({ productId: 12});
        });
    });

    describe('PUT', () => {
        const updateProduct = {
            price: 500
        };

        it('devuelve un mensaje en caso de no mandar un ID', async () => {
            const res = await request.put('/');
            expect(res.body).to.eql({ message: 'Debe introducir un ID' });
        });

        it('devuelve un mensaje en caso de que no exista el producto', async () => {
            const res = await request.put('/3');
            expect(res.body).to.eql({ message: 'El id del producto no existe' });
        });

        it('devuelve el producto actualizado y un flag de que se realizó', async () => {
            const res = await request.put('/12').send(updateProduct);
            expect(res.body).to.eql({ 
                beforeUpdate: {
                    id: 12,
                    name: 'Mesa',
                    price: 400,
                    thumbnail: 'https://via.placeholder.com/150'
                },
                updated: 1
            });
        });
    });

    describe('DELETE', () => {
        it('devuelve un mensaje en caso de no mandar un ID', async () => {
            const res = await request.delete('/');
            expect(res.body).to.eql({ message: 'Debe introducir un ID' });
        });

        it('devuelve un mensaje en caso de que no exista el producto', async () => {
            const res = await request.delete('/3');
            expect(res.body).to.eql({ message: 'El id del producto no existe' });
        });

        it('devuelve el producto actulizado y un flag de que se realizó', async () => {
            const res = await request.delete('/12');
            expect(res.body).to.eql({ 
                beforeDelete: {
                    id: 12,
                    name: 'Mesa',
                    price: 500,
                    thumbnail: 'https://via.placeholder.com/150'
                },
                deleted: 1
            });
        });
    });
});