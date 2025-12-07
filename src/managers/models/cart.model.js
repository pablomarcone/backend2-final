import mongoose from 'mongoose';

export const cartModel = mongoose.model(
    'Cart', new mongoose.Schema({
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
            _id: false
        }],
        required: true
    }
}, { timestamps: true })
);