export class CartRepository {
    constructor(manager) {
            this.manager = manager;
        }
    async getCarts() {
        try {
            return await this.manager.getCarts();
        } catch (error) {
            throw new Error("Error al obtener los carritos: " + error);
        }
    }
    async getCartById(id) {
        try {
            return await this.manager.getCartById(id);
        } catch (error) {
            throw new Error("Error al obtener el carrito: " + error);
        }
    }
    async createCart(products) {
        try {
            return await this.manager.createCart(products);
        } catch (error) {
            throw new Error("Error al crear el carrito: " + error);
        }
    }
    async updateCart(id, products) {
        try {
        const cart = await this.manager.getCartById(id);
        if (!cart) {
                throw new Error("Carrito no encontrado");
            }
            return await this.manager.updateCart(id, products);
        } catch (error) {
            throw new Error("Error al actualizar el carrito: " + error);
        }
    }
    async deleteCart(id) {
        try {
        const cart = await this.manager.getCartById(id);
        if (!cart) {
                throw new Error("Carrito no encontrado");
            }
        return await this.manager.deleteCart(id);
        } catch (error) {
            throw new Error("Error al eliminar el carrito: " + error);
        }
    }
}