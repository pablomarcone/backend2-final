export class TicketService {
    constructor(ticketRepository, cartRepository, productRepository, userRepository) {
        this.ticketRepository = ticketRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }
    async createTicket(email, cartId) {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            const cart = await this.cartRepository.getCartById(cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }
            if (!cart.products || cart.products.length === 0) {
                throw new Error("El carrito está vacío");
            }
            const ticketProducts = [];
            let totalAmount = 0;
            for (const cartItem of cart.products) {
                const product = await this.productRepository.getProductById(cartItem.product);
                if (!product) {
                    throw new Error("Producto no encontrado");
                }
                if (product.stock < cartItem.quantity) {
                    throw new Error("Stock insuficiente");
                }
                totalAmount += product.price * cartItem.quantity;
                ticketProducts.push({
                    product: cartItem.product.toString(),
                    unitPrice: product.price,
                    quantity: cartItem.quantity,
                });
            }
            await Promise.all(
                ticketProducts.map(product =>
                    this.productRepository.updateProductStock(
                        product.product.toString(),
                        product.quantity
                    )
                )
            );
            const ticket = await this.ticketRepository.createTicket({
                user: user.id,
                totalAmount: totalAmount,
                products: ticketProducts,
            });
            return ticket;
        } catch (error) {
            throw new Error("Error al crear el ticket: " + error);
        }
    }
}