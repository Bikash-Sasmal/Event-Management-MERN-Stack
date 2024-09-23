import React, { useState, useEffect } from 'react';
import { getTickets } from '../../Api'; 
import TicketList from './TicketList';
import '../../css/tickets.css'


const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getTickets();  
        console.log('tickets')
        console.log(response.data)
        setTickets(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
<div className="ticket-page">
  <div className="header-containerr">
    <h1>Your Tickets</h1>
  </div>

  {tickets.length === 0 ? (
    <div className="ticket-list-container">
      <p>No tickets found.</p>
    </div>
  ) : (
    <div className="ticket-list-container">
      <ul className="ticket-list">
        {tickets.map((ticket) => (
          <TicketList key={ticket._id} ticket={ticket} setTickets={setTickets} />
        ))}
      </ul>
    </div>
  )}
</div>


  );
};

export default Tickets;
