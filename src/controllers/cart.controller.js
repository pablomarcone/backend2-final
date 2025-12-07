import mongoose from 'mongoose';
import { cartService } from '../service/factory.js';

export const getCarts = async (req, res) => {
    try {
        const carts = await cartService.getCarts();
        res.status(200).json({ status: 'success', carts: carts });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

export const getCartById = async (req, res) => {
    try {
        const id = req.params.cid;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("ID de carrito no válido");
        }
        const cart = await cartService.getCartById(id);
        res.status(200).json({ status: 'success', cart: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

export const createCart = async (req, res) => {
    try {
        const products = req.body;
        const newCart = await cartService.createCart(products);
        res.status(201).json({ status: 'success', cart: newCart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
    }

export const addProductToCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw new Error("ID de carrito no válido");
        }
        const productId = req.params.pid;
        const cart = await cartService.addProductToCart(cartId, productId);
        res.status(201).json({ status: 'success', cart: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

export const updateCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw new Error("ID de carrito no válido");
        }
        const products = req.body;
        const cart = await cartService.updateCart(cartId, products);
        res.status(200).json({ status: 'success', cart: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

export const updateProductQuantity = async (req, res) => {
    try {
        const cartId = req.params.cid;
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw new Error("ID de carrito no válido");
        }
        const productId = req.params.pid;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error("ID de producto no válido");
        }
        const quantity = req.body.quantity;
        const cart = await cartService.updateProductQuantity(cartId, productId, quantity);  
        res.status(200).json({ status: 'success', cart: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw new Error("ID de carrito no válido");
        }
        const productId = req.params.pid;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error("ID de producto no válido");
        }
        const cart = await cartService.deleteProductFromCart(cartId, productId);
        res.status(200).json({ status: 'success', cart: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

export const deleteCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw new Error("ID de carrito no válido");
        }
        const cart = await cartService.deleteCart(cartId);
        res.status(200).json({ status: 'success', cart: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}