import mongoose from 'mongoose';
import { productRepository } from '../service/factory.js';

export const getProducts = async (req, res) => {
    try {
        const result = await productRepository.getProducts(req);
        res.status(200).json({ 
            status: result.status,
            payload: result.payload, 
            totalPages: result.totalPages, 
            prevPage: result.prevPage, 
            nextPage: result.nextPage, 
            page: result.page, 
            hasPrevPage: result.hasPrevPage, 
            hasNextPage: result.hasNextPage, 
            prevLink: result.prevLink, 
            nextLink: result.nextLink });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const id = req.params.pid;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("ID de producto no válido");
        }
        const product = await productRepository.getProductById(id);    
        res.status(200).json({ status: 'success', product: product });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

export const addProduct = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productRepository.addProduct(product);
        res.status(201).json({ status: 'success', product: newProduct });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.pid;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("ID de producto no válido");
        }
        const product = req.body;
        const updProduct = await productRepository.updateProduct(id, product);
        res.status(200).json({ status: 'success', product: updProduct });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.pid;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("ID de producto no válido");
        }
        const product = await productRepository.deleteProduct(id);
        res.status(200).json({ status: 'success', product: product });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}