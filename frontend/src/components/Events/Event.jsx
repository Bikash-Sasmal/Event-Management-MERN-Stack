import React, { useState, useEffect } from 'react';
import EventList from './EventList';
import { getEvents, searchEvents } from '../../Api'; // Import API functions
import { Link } from 'react-router-dom';
import '../../css/Event.css'
import { PropagateLoader } from 'react-spinners';

function Event() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    

     const [searchParams, setSearchParams] = useState({
        city: '',
        date: '',
        privacy: '',
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await getEvents();
                setEvents(response.data); 
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch events.');
                setLoading(false);
                console.error('Failed to fetch events:', error.message);
            }
        };

        fetchEvents();
    }, []); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

     // Handle search form submission
     const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await searchEvents(searchParams);
            setEvents(response.data); 
            setLoading(false);
        } catch (error) {
            setError('Failed to search events.');
            setLoading(false);
            console.error('Failed to search events:', error.message);
        }
    };

    return (
        <div className="event-page">
            <div className="header-container">
                <h1>All Events</h1>
                <Link to='/create'><button>Create New Event</button></Link>
            </div>

          
             <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                    type="text"
                    name="city"
                    placeholder="city"
                    value={searchParams.location}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="date"
                    value={searchParams.date}
                    onChange={handleInputChange}
                />
              <select
                    name="privacy"
                    value={searchParams.privacy}
                    onChange={handleInputChange}
                >
                    <option value="">Select Privacy</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
              
                <button type="submit">Search</button>
            </form>

            {loading && <PropagateLoader color="#54b32d" className='spinner'/>}

          
            <div className="event-list-container">
                <EventList events={events} error={error} />
            </div>

       
        </div>
    );
}

export default Event;
