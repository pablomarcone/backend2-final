import express from 'express';
const router = express.Router();

import productRouter from './product.router.js';
import cartRouter from './cart.router.js';
import viewsRouter from './views.router.js';
import sessionsRouter from './sessions.router.js';
import ticketRouter from './ticket.router.js';
router.use('/api/products', productRouter);
router.use('/api/carts', cartRouter);
router.use('/api/sessions', sessionsRouter);
router.use('/api/tickets', ticketRouter);
router.use('/', viewsRouter);

export default router;