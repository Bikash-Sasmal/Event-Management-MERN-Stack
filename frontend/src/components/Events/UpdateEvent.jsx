import React, { useState, useEffect } from 'react';
import { getEventDetails, updateEvent } from '../../Api'; 
import { useParams, useNavigate } from 'react-router-dom';
import '../../css/CreateEvent.css';
import { toast } from 'react-toastify';

function UpdateEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [ticketType, setTicketType] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState('');
    const [privacy, setPrivacy] = useState('public');
    const { eventId } = useParams(); // Extract event ID from URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await getEventDetails(eventId);
                const event = response.data;
                setTitle(event.title);
                setDescription(event.description);
                setDate(event.date);
                setTime(event.time);
                setLocation(event.location.address);
                setCity(event.location.city);
                setState(event.location.state);
                setZip(event.location.zip);
                setTicketType(event.ticketing.ticketTypes[0]?.type || '');
                setPrice(event.ticketing.ticketTypes[0]?.price || '');
                setAvailability(event.ticketing.ticketTypes[0]?.availability || '');
                setPrivacy(event.privacy);
            } catch (error) {
                console.error('Failed to fetch event details:', error.response?.data?.message || error.message);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = {
            title,
            description,
            date,
            time,
            location: { address: location, city, state, zip },
            ticketing: {
                ticketTypes: [{ type: ticketType, price: parseFloat(price), availability: parseInt(availability) }],
                sales: { sold: 0, remaining: parseInt(availability) }
            },
            privacy
        };

        try {
            await updateEvent(eventId, eventData); 
            console.log(eventId)
            console.log(eventData);
            toast.success('event update successfully')
            navigate('/events'); 
        } catch (error) {
            console.error('Event update failed:', error.response?.data?.message || error.message);
            toast.error('something wrong in updation')
        }
    };

    return (
        <div className="create-event-container">
            <div className="create-event-border">
                <h2 className="create-event-title">Update Event</h2>
                <form onSubmit={handleSubmit} className="create-event-form">
                    <label className="title-label">
                        <p className="title">Event Title <sup className="star">*</sup></p>
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="create-event-input"
                        />
                    </label>
                    <label className="description-label">
                        <p className="description">Description <sup className="star">*</sup></p>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="create-event-textarea"
                        />
                    </label>
                    <label className="date-label">
                        <p className="date">Date <sup className="star">*</sup></p>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="create-event-input"
                        />
                    </label>
                    <label className="time-label">
                        <p className="time">Time <sup className="star">*</sup></p>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="create-event-input"
                        />
                    </label>
                    <label className="location-label">
                        <p className="location">Address <sup className="star">*</sup></p>
                        <input
                            type="text"
                            placeholder="Address"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="create-event-input"
                        />
                    </label>
                    <label className="city-label">
                        <p className="city">City <sup className="star">*</sup></p>
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="create-event-input"
                        />
                    </label>
                    <label className="state-label">
                        <p className="state">State <sup className="star">*</sup></p>
                        <input
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="create-event-input"
                        />
                    </label>
                    <label className="zip-label">
                        <p className="zip">ZIP Code <sup className="star">*</sup></p>
                        <input
                            type="text"
                            placeholder="ZIP Code"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            className="create-event-input"
                        />
                    </label>
                    <label className="ticket-type-label">
                        <p className="ticket-type">Ticket Type <sup className="star">*</sup></p>
                        <input
                            type="text"
                            placeholder="Ticket Type"
                            value={ticketType}
                            onChange={(e) => setTicketType(e.target.value)}
                            className="create-event-input"
                        />
                    </label>
                    <label className="price-label">
                        <p className="price">Price <sup className="star">*</sup></p>
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="create-event-input"
                        />
                    </label>
                    <label className="availability-label">
                        <p className="availability">Availability <sup className="star">*</sup></p>
                        <input
                            type="number"
                            placeholder="Availability"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            className="create-event-input"
                        />
                    </label>
                    <label className="privacy-label">
                        <p className="privacy">Privacy <sup className="star">*</sup></p>
                        <select value={privacy} onChange={(e) => setPrivacy(e.target.value)} className="create-event-select">
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </label>
                    <button type="submit" className="create-event-button">Update Event</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateEvent;
