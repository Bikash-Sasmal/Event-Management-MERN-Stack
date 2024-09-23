const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    organizerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true }
    },
    ticketing: {
        ticketTypes: [
            {
                type: { type: String, required: true },
                price: { type: Number, required: true },
                availability: { type: Number, required: true }
            }
        ],
        sales: {
            sold: { type: Number, default: 0 },
            remaining: { type: Number, default: 0 }
        }
    },
    privacy: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    attendees: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            ticketType: { type: String},
            paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
