import mongoose from 'mongoose';
import { ticketService } from '../service/factory.js';

export const createTicket = async (req, res) => {
    try {
        const { email } = req.user;
        const cartId = req.params.cid;
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw new Error("ID de carrito inválido");
        }
        const ticket = await ticketService.createTicket(email, cartId);
        res.status(201).json({ status: 'success', ticket: ticket });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al crear el ticket'});
    }
}