import { ticketModel } from './models/ticket.model.js';

export class TicketManager {
    async createTicket(ticket) {
        const newTicket = new ticketModel(ticket);
        return await newTicket.save();
    }
}