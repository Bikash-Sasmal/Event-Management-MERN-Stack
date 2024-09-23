
import RegisterEvent from './RegisteEvent';
import React, { useState } from 'react';
import '../../css/EventList.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, Navigate } from 'react-router-dom';
import { updateEvent, deleteEvent } from '../../Api';
import { toast } from 'react-toastify';

function EventList({ events, error }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [registeredEvents, setRegisteredEvents] = useState([]);  
    console.log(registeredEvents)

    const handleRegister = (eventId) => {
        setSelectedEvent(eventId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleRegistrationComplete = () => {
        setRegisteredEvents([...registeredEvents, selectedEvent]);
        setModalOpen(false); 
    };

      const handleDelete = async (eventId) => {
        
        try {
            console.log(eventId);
            await deleteEvent(eventId);
            console.log('Event deleted successfully');
            toast.success('Event delete successfully');
            const updatedEvents = events.filter(event => event._id !== eventId);
            // console.log('deleted')
            window.location.reload();
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };
    return (
        <div className="event-list">
            {error && <p>{error}</p>}

            {events.length > 0 ? (
                <ul className="event-items">
                    {events.map(event => (
                        <li key={event._id} className="event-item">
                            <div className="event-info">
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <p>{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                                <p>{event.location[0]}</p>
                                <Link to={`/geteventdetails/${event._id}`}>View Details</Link>
                            </div>
                            <div className="event-actions">
                                <div className="action-top-row">
                                <Link to={`/updateevent/${event._id}`}><button className="update-btnn"><FaEdit /></button></Link>
                                    <button className="delete-btnn" onClick={() => handleDelete(event._id)}><MdDelete /></button>
                                </div>

                                {!registeredEvents.includes(event._id) && (
                                    <button className="register-btnn" onClick={() => handleRegister(event._id)}>Register</button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No events available.</p>
            )}

            {isModalOpen && (
                <RegisterEvent
                    eventId={selectedEvent}
                    handleCloseModal={handleCloseModal}
                    onRegistered={handleRegistrationComplete}  
                />
            )}
        </div>
    );
}

export default EventList;