import express from 'express';
import mongoose from 'mongoose';
import { productRepository } from '../service/factory.js';
import { cartService } from '../service/factory.js';
import { createCart, addProductToCart, getCarts } from '../controllers/cart.controller.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await productRepository.getProducts({ query: { limit: -1 } });
        const context = {
            products: products.payload.map(p => ({ ...p, thumbnail: (p.thumbnails && p.thumbnails.length > 0) ? p.thumbnails[0] : '/img/no-imagen.png' }))
        }
        res.render('pages/home', context);
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

router.get('/products', async (req, res) => {
    try {
        const products = await productRepository.getProducts(req);
        const context = {
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            products: products.payload.map(p => ({
                ...p,
                thumbnail: (p.thumbnails && p.thumbnails.length > 0) ? p.thumbnails[0] : '/img/no-imagen.png',
                description: p.description.replace(/<[^>]+>/g, '')
            })),
            prevLink: products.prevLink,
            nextLink: products.nextLink,
            currentLimit: products.currentLimit,
            currentSort: products.currentSort,
            currentStatus: products.currentStatus,
            currentCategory: products.currentCategory,
            availableCategories: products.availableCategories,
        }
        res.render('pages/products', context);
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

router.get('/products/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("ID de producto no válido");
        }
        const product = await productRepository.getProductById(id);
        const context = {
            _id: product._id,
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            status: product.status,
            stock: product.stock,
            category: product.category,
            thumbnails: product.thumbnails
        }
        res.render('pages/product-detail', context);
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

router.get('/carts/:cid', async (req, res) => {
    try {
        const id = req.params.cid;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("ID de carrito no válido");
        }
        const cart = await cartService.getCartById(id);
        if (cart.products.length) {
            const context = {
                _id: cart._id,
                products: cart.products.map(p => ({ ...p, subtotal: (p.quantity * p.product.price).toFixed(2) })),
                total: cart.products.reduce((acc, product) => acc + product.quantity * product.product.price, 0)
            };
            res.render('pages/cart-detail', context);
        } else {
            res.render('pages/cart-detail', {});
        }
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

router.get('/realtimeProducts', (req, res) => {
    try {
        res.render('pages/realtime-products');
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

router.get('/views/carts', getCarts);
router.post('/views/carts', createCart);
router.post('/views/carts/:cid/products/:pid', addProductToCart);

export default router;