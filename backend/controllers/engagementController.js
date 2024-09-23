const Engagement = require('../models/Engagement');
const Event = require('../models/Event');


exports.createPoll = async (req, res) => {
    const { question, options } = req.body;
    const userId = req.user.userId; 
    const {eventId} = req.params;

    try {
        // console.log(userId)
        // console.log(eventId)

        const event = await Event.findOne({ _id: eventId, 'attendees.userId': userId });
        // console.log(event);

        if (!event) {
            return res.status(403).json({ message: 'You are not an attendee of this event' });
        }

        const engagement = new Engagement({
            eventId,
            type: 'poll',
            poll: { question, options }
        });

        await engagement.save();
        res.status(201).json({ message: 'Poll created successfully', engagement });
    } catch (error) {
        res.status(500).json({ message: 'Error creating poll', error });
    }
};

exports.createDiscussion = async (req, res) => {
    const { message } = req.body;
    const userId = req.user.userId; 
    const eventId = req.params.eventId; 

    try {
        
        const event = await Event.findOne({ _id: eventId, 'attendees.userId': userId });

        if (!event) {
            return res.status(403).json({ message: 'You are not an attendee of this event' });
        }
        
        const engagement = new Engagement({
            eventId,
            type: 'discussion',
            discussion: { message, userId }
        });

        await engagement.save();
        res.status(201).json({ message: 'Discussion created successfully', engagement });
    } catch (error) {
        res.status(500).json({ message: 'Error creating discussion', error });
    }
};


exports.votePoll = async (req, res) => {
    const { engagementId, optionIndex } = req.body; 
    const userId = req.user.userId;

    try {
        const engagement = await Engagement.findById(engagementId);
        
        if (!engagement || engagement.type !== 'poll') {
            return res.status(404).json({ message: 'Poll not found or invalid engagement type.' });
        }

        if (engagement.poll.voters.includes(userId)) {
            return res.status(400).json({ message: 'You have already voted in this poll.' });
        }

        engagement.poll.options[optionIndex].votes += 1;

        engagement.poll.voters.push(userId);

        await engagement.save();

        res.status(200).json({ message: 'Vote recorded successfully!' });
    } catch (error) {
        console.error('Error voting in poll:', error);
        res.status(500).json({ message: 'Error voting in poll', error });
    }
};


exports.getEngagementDetails = async (req, res) => {
    const { eventId } = req.params;

    try {
        const engagement = await Engagement.find({eventId});
        // console.log('engagement : ',engagement);

        if (!engagement) {
            return res.status(404).json({ message: 'Engagement not found' });
        }

        res.status(200).json(engagement);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching engagement details', error });
    }
};