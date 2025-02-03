// models/orderModel.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        size: {
            type: String,
            required: true
        }
    }],
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    address: {
        firstName: String,
        lastName: String,
        street: String,
        city: String,
        zipcode: String,
        country: String,
        phone: String
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'card', 'paypal'],
        required: true
    },
    payment: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Méthode pour formater la date
orderSchema.methods.formatDate = function () {
    return new Date(this.createdAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Middleware pour convertir les montants en nombres à 2 décimales
orderSchema.pre('save', function (next) {
    if (this.amount) {
        this.amount = parseFloat(this.amount.toFixed(2));
    }
    next();
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;