const mongoose = require('mongoose');

const engagementSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    type: {
        type: String,
        enum: ['poll', 'discussion', 'qna'],
        required: true
    },
    poll: {
        question: String,
        options: [
            {
                option: String,
                votes: { type: Number, default: 0 }
            }
        ],
        voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },
    discussion: {
        message: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
});

const Engagement = mongoose.model('Engagement', engagementSchema);
module.exports = Engagement;
