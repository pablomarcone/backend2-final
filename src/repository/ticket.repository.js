export class TicketRepository {
    constructor(manager) {
        this.manager = manager;
    }
    async createTicket(ticket) {
        try {
            return await this.manager.createTicket(ticket);
        } catch (error) {
            throw new Error("Error al crear el ticket: " + error);
        }
    }
}