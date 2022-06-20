import express from 'express';
import ApiProdsMock from '../api/products.js';

class productsRouter extends express.Router{
    constructor(){
        super()
        const apiProducts = new ApiProdsMock();

        this.post('/productstest', async (req, res, next) => {
            try {
                res.json (await apiProducts.prodsTest(Number(req.query.amount)));
            } catch (error) {
                next(error);
            }
        })

        this.get('/', async (req, res, next) => {
            try {
                res.json(await apiProducts.getAll());
            } catch (error) {
                next (error);
            }
        })
    }
}

export default productsRouter;