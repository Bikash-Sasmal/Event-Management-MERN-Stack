import React, { useState } from 'react';
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
import { attendEvent } from '../../Api';  
import '../../css/RegisterEvent.css';

const RegisterEvent = ({ eventId, handleCloseModal, onRegistered }) => {
    const [ticketType, setTicketType] = useState('General'); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('registration');
        try {
           
              const response = await attendEvent(eventId, { ticketType, paymentStatus: 'unpaid' });
              console.log(response.data);
                toast.success('Successfully registered for the event!');
                onRegistered(eventId);  
                handleCloseModal();  
                navigate('/tickets');  
            
        } catch (error) {
            toast.error('Registration failed, please try again or check you are a user or not in ticket');
            console.error('Error registering for event:', error);
        }
    };

    return (
        <div className="registration-modal-overlay" onClick={handleCloseModal}>
            <div className="registration-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="registration-title">Register for Event</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="ticketType" className="ticket-label">Ticket Type:</label>
                    <select
                        id="ticketType"
                        value={ticketType}
                        onChange={(e) => setTicketType(e.target.value)}
                        required
                        className="ticket-select"
                    >
                        <option value="general">General</option>
                        <option value="vip">VIP</option>
                    </select>

                    <div className="button-container">
                        <button type="submit" className="registration-submit-btn">Submit</button>
                        <button type="button" className="registration-close-btn"  onClick={handleCloseModal} >Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterEvent;
