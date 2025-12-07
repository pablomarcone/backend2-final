import { cartModel } from './models/cart.model.js';

export class CartManager {
    async getCarts() {
        return await cartModel.find({}, '_id products').lean();
    }

    async getCartById(id) {
        const cart = await cartModel.findById(id, '_id products')
            .populate('products.product', '_id title description code price status stock category thumbnails')
            .lean();
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
        return cart;
    }

    async createCart(products) {
        const newCart = new cartModel({ products: products });
        return await newCart.save();
    }

    async updateCart(id, products) {
        return await cartModel.findByIdAndUpdate(id, { products: products });
    }

    async deleteCart(id) {
        const cart = await cartModel.findById(id);
        cart.products = [];
        return await cart.save();
    }
}