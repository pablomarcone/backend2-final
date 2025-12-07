export class CartService {
    constructor(cartRepository, productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }
    async getCarts() {
        try {
            return await this.cartRepository.getCarts();
        } catch (error) {
            throw new Error("Error al obtener los carritos: " + error);
        }
    }
    async getCartById(cartId) {
        try {
            return await this.cartRepository.getCartById(cartId);
        } catch (error) {
            throw new Error("Error al obtener el carrito: " + error);
        }
    }
    async createCart(products) {
        try {
            return await this.cartRepository.createCart(products);
        } catch (error) {
            throw new Error("Error al crear el carrito: " + error);
        }
    }
    async updateCart(cartId, products) {
        try {
            return await this.cartRepository.updateCart(cartId, products);
        } catch (error) {
            throw new Error("Error al actualizar el carrito: " + error);
        }
    }
    async deleteCart(cartId) {
        try {
            return await this.cartRepository.deleteCart(cartId);
        } catch (error) {
            throw new Error("Error al eliminar el carrito: " + error);
        }
    }
    async addProductToCart(cartId, productId) {
        try {
            const cart = await this.cartRepository.getCartById(cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }
            const product = await this.productRepository.getProductById(productId);
            if (!product) {
                throw new Error("Producto no encontrado");
            }
            const cartProduct = cart.products?.find(p => p.product._id.toString() === productId);
            if (cartProduct) {
                cartProduct.quantity += 1;
            } else {
                cart.products?.push({ product: productId, quantity: 1 });
            }
            return await this.cartRepository.updateCart(cartId, cart.products);
        } catch (error) {
            throw new Error("Error al agregar el producto al carrito: " + error);
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await this.cartRepository.getCartById(cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }
            const product = await this.productRepository.getProductById(productId);
            if (!product) {
                throw new Error("Producto no encontrado");
            }
            const cartProduct = cart.products?.find(p => p.product._id.toString() === productId);
            if (cartProduct) {
                cartProduct.quantity = quantity;
            } else {
                throw new Error("Producto no encontrado en el carrito");
            }
            return await this.cartRepository.updateCart(cartId, cart.products);
        } catch (error) {
            throw new Error("Error al actualizar la cantidad de producto: " + error);
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            const cart = await this.cartRepository.getCartById(cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }
            cart.products = cart.products.filter(p => p.product._id.toString() !== productId);
            return await this.cartRepository.updateCart(cartId, cart.products);
        } catch (error) {
            throw new Error("Error al eliminar el producto del carrito: " + error);
        }
    }
}