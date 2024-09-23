const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const { sendEmailNotification } = require('./notificationController');

exports.createEvent = async (req, res) => {
    const { title, description, date, time, location, ticketing, privacy } = req.body;
    const organizerId = req.user.userId;  

     if (!organizerId) {
         return res.status(400).json({ message: 'Organizer ID is missing' });
     }

    try {
        const event = new Event({ organizerId, title, description, date, time, location, ticketing, privacy });
        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};

exports.getEventDetails = async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findById(eventId)
            .populate('organizerId', 'name email') 
            .populate('attendees.userId', 'name email');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event details', error });
    }
};


exports.updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const { title, description, date, time, location, ticketing, privacy } = req.body;
    const userId = req.user.userId;

    try {
       
        const event = await Event.findById(eventId);
        // console.log('event : ', event)

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.organizerId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this event' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { title, description, date, time, location, ticketing, privacy },
            { new: true }
        );
        // console.log(updatedEvent)

        updatedEvent.attendees.forEach(async (attendee) => {
            const user = await User.findById(attendee.userId);
            const message = `The event "${updatedEvent.title}" has been updated.`;
            await sendEmailNotification(user.email, 'Event Updated', message);
        });

        res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: 'Error updating event', error });
    }
};


exports.deleteEvent = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.userId; 

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.organizerId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this event' });
        }

        await Event.findByIdAndDelete(eventId);

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
};



exports.attendEvent = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.userId;  
    const { ticketType } = req.body; 

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const isAlreadyAttendee = event.attendees.some(attendee => attendee.userId.toString() === userId);
        if (isAlreadyAttendee) {
            return res.status(400).json({ message: 'User is already an attendee of this event' });
        }

        const ticket = event.ticketing.ticketTypes.find(t => t.type === ticketType);
  
        if (!ticket) {
            return res.status(400).json({ message: 'Invalid ticket type' });
        }

        event.attendees.push({
            userId,
            ticketType,
            paymentStatus: 'unpaid' 
        });

        await event.save();
        const newTicket = new Ticket({
            userId,
            eventId: event._id,
            ticketType,
            paymentStatus: 'unpaid' 
        });
        await newTicket.save();
        console.log('test')
        res.status(201).json({ message: 'You have successfully registered for the event and a ticket has been generated', event, ticket });
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: 'Error attending event', error });
    }
};

exports.searchEvents = async (req, res) => {
    const { city, date, privacy } = req.query;
  
    const query = {};
  
    if (city) {
      query.location.city = city;
      console.log('query: ',query.location.city)
    }
  
    if (date) {
      query.date = new Date(date);
    }
  
    if (privacy) {
      query.privacy = privacy;
    }
    try {
      const events = await Event.find(query);
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error searching events' });
    }
  };


exports.getEventStats = async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findById(eventId);
            // console.log(event);
        
        const totalTickets = event.ticketing.ticketTypes.reduce((acc, type) => acc + type.availability, 0);
        const ticketsSold = event.ticketing.sales.sold;
        const attendees = event.attendees.length;

        res.status(200).json({
            eventTitle: event.title,
            totalTickets,
            ticketsSold,
            attendees,
            attendeesList: event.attendees
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching event statistics', error });
    }
};

