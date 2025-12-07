import { UserManager } from '../managers/user.manager.js';
import { ProductManager } from '../managers/product.manager.js';
import { CartManager } from '../managers/cart.manager.js';
import { UserRepository } from '../repository/user.repository.js';
import { ProductRepository } from '../repository/product.repository.js';
import { CartRepository } from '../repository/cart.repository.js';
import { CartService } from '../service/cart.service.js';
import { TicketManager } from '../managers/ticket.manager.js';
import { TicketRepository } from '../repository/ticket.repository.js';
import { TicketService } from '../service/ticket.service.js';

const userManager = new UserManager();
const userRepository = new UserRepository(userManager);

const productManager = new ProductManager();
const productRepository = new ProductRepository(productManager);

const cartManager = new CartManager();
const cartRepository = new CartRepository(cartManager);
const cartService = new CartService(cartRepository, productRepository);

const ticketManager = new TicketManager();
const ticketRepository = new TicketRepository(ticketManager);
const ticketService = new TicketService(ticketRepository, cartRepository, productRepository, userRepository);

export { userRepository, productRepository, cartService, ticketService };