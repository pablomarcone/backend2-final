import mongoose from 'mongoose';

export const ticketModel = mongoose.model(
    'Ticket', new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        products: {
            type: [{
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                unitPrice: {
                    type: Number,
                    required: true
                },
                _id: false
            }],
            required: true
        }
    }, { timestamps: true })
);