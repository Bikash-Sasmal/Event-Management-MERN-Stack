import React, { useState } from 'react';
import { updateTicketStatus } from '../../Api';  
import approved from '../../assets/approved.png'
import toast from 'react-hot-toast';

const TicketList = ({ ticket, setTickets }) => {
  const [paymentStatus, setPaymentStatus] = useState(ticket.paymentStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayClick = async () => {
    if (paymentStatus === 'paid') return; 

    try {
      setLoading(true);
      await updateTicketStatus(ticket._id, { paymentStatus: 'paid' });
      setPaymentStatus('paid'); 
      toast.success('Payment Successfully')
      setTickets((prevTickets) =>
        prevTickets.map((t) =>
          t._id === ticket._id ? { ...t, paymentStatus: 'paid' } : t
        )
      );

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <li className="ticket-item">
  <div className="ticket-info">
    <h3>Event: {ticket.eventId.title}</h3> {/* Show event details */}
    <p>Date: {new Date(ticket.eventId.date).toLocaleDateString()}</p>
    <p>Location: {ticket.eventId.location.city}</p>
    <p>Ticket Type: {ticket.ticketType}</p>
    <p>Payment Status: {paymentStatus}</p>
  </div>

  {paymentStatus === 'unpaid' ? (
    <div className="ticket-actions">
      <button className="pay-button" onClick={handlePayClick} disabled={loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </div>
  ) :   <img src={approved} alt="approved" loading='lazy' height='60px' width='60px'/>}

  {error && <p>Error: {error}</p>}
</li>

  );
};

export default TicketList;
