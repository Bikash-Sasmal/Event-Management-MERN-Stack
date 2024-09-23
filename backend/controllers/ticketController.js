const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

exports.getTickets = async (req, res) => {
    const userId = req.user.userId;  
  
    try {
      const tickets = await Ticket.find({ userId }).populate('eventId');  
      if (!tickets || tickets.length === 0) {
        return res.status(404).json({ message: 'No tickets found for this user' });
      }
  
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tickets', error });
    }
  };

exports.updateTicket = async (req, res) => {
    const { ticketId } = req.params;  
    const { paymentStatus } = req.body;  

    try {
      
        const ticket = await Ticket.findById(ticketId);
        console.log('ticket : ',ticket);
        
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

   
        if (paymentStatus && paymentStatus === 'paid' && ticket.paymentStatus !== 'paid') {
            const event = await Event.findById(ticket.eventId);

            if (!event) {
                return res.status(404).json({ message: 'Associated event not found' });
            }

            const ticketTypeInEvent = event.ticketing.ticketTypes.find(t => t.type === ticket.ticketType);
            if (!ticketTypeInEvent) {
                return res.status(400).json({ message: 'Ticket type in event not found' });
            }

            if (ticketTypeInEvent.availability <= 0) {
                return res.status(400).json({ message: 'No tickets available for this type' });
            }

            ticketTypeInEvent.availability -= 1;
            event.ticketing.sales.sold += 1;
            event.ticketing.sales.remaining -= 1;


            await event.save();
        }

        if (paymentStatus) {
            ticket.paymentStatus = paymentStatus;
        }
        await ticket.save();

        res.status(200).json({ message: 'Ticket status updated successfully', ticket });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating ticket status', error });
    }
};

 