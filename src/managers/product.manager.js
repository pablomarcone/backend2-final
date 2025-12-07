import { productModel } from './models/product.model.js';

export class ProductManager {
    async getProducts(req) {
        const { page = 1, limit = 10, sort = '', category = '', status = '' } = req.query;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            select: '_id title description code price status stock category thumbnails',
            lean: true,
            leanWithId: false,
        };
        if (limit === -1) { options.pagination = false; }
        if (sort.toLowerCase() === 'asc') {
            options.sort = { price: 1 };
        } else if (sort.toLowerCase() === 'desc') {
            options.sort = { price: -1 };
        };
        const filter = {};
        if (category) {
            filter.category = category;
        };
        if (status === 'true' || status === 'false') {
            filter.status = status;
        };
        return await productModel.paginate(filter, options);
    }

    async getAvailableCategories() {
        return await productModel.distinct('category').sort();
    }

    async getProductById(id) {
        const product = await productModel.findById(id, '_id title description code price status stock category thumbnails').lean();
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    }

    async addProduct(product) {
        const newProduct = new productModel({
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            status: product.status,
            stock: product.stock,
            category: product.category,
            thumbnails: product.thumbnails || []
        });
        return await newProduct.save();
    }

    async updateProduct(id, product) {
        const updProduct = await productModel.findByIdAndUpdate(id, product, { new: true });
        if (!updProduct) {
            throw new Error("Producto no encontrado");
        }
        return updProduct;
    }

    async deleteProduct(id) {
        const delProduct = await productModel.findByIdAndDelete(id);
        if (!delProduct) {
            throw new Error("Producto no encontrado");
        }
        return delProduct;
    }
}