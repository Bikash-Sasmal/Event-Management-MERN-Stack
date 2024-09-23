import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventDetails, getEngagementDetails } from '../../Api';
import EventDetails from './EventDetails';

const GetEventDetails = () => {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const eventResponse = await getEventDetails(eventId);
                setEventDetails(eventResponse.data);                
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch event and engagement details.');
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if (loading) {
        return <p>Loading event details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {eventDetails ? (
                <div>
                    <EventDetails eventDetails={eventDetails} eventId={eventId} />
                </div>
            ) : (
                <p>No event details found.</p>
            )}
        </div>
    );
};

export default GetEventDetails;
