export class ProductRepository {
    constructor(manager) {
        this.manager = manager;
    }
    async getProducts(req) {
        try {
        const { sort = '', category = '', status = '' } = req.query;
        const result = await this.manager.getProducts(req);
        const generateUrl = (n) => `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}?${new URLSearchParams({...req.query, page: n})}`;
        const availableCategories = await this.manager.getAvailableCategories();
        return {
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? generateUrl(result.prevPage) : null,
            nextLink: result.hasNextPage ? generateUrl(result.nextPage) : null,
            currentLimit: result.limit,
            currentSort: sort.toLowerCase(),
            currentStatus: status,
            currentCategory: category,
                availableCategories: availableCategories,
            };
        } catch (error) {
            throw new Error("Error al obtener los productos: " + error);
        }
    }
    async getProductById(id) {
        try {
            return await this.manager.getProductById(id);
        } catch (error) {
            throw new Error("Error al obtener el producto: " + error);
        }
    }
    async addProduct(product) {
        try {
            return await this.manager.addProduct(product);
        } catch (error) {
            throw new Error("Error al agregar el producto: " + error);
        }
    }
    async updateProduct(id, product) {
        try {
            return await this.manager.updateProduct(id, product);
        } catch (error) {
            throw new Error("Error al actualizar el producto: " + error);
        }
    }
    async deleteProduct(id) {
        try {
            return await this.manager.deleteProduct(id);
        } catch (error) {
            throw new Error("Error al eliminar el producto: " + error);
        }
    }
    async updateProductStock(id, quantity) {
        try {
            const product = await this.manager.getProductById(id);
            if (!product) {
                throw new Error("Producto no encontrado");
            }
            product.stock -= quantity;
            return await this.manager.updateProduct(id, product);
        } catch (error) {
            throw new Error("Error al actualizar el stock del producto: " + error);
        }
    }
}