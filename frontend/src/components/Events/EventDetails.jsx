
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEngagementDetails ,votePoll } from '../../Api'; 
import '../../css/EventDetails.css';
import { toast } from 'react-toastify';

const EventDetails = ({ eventDetails, eventId }) => {
    const [engagements, setEngagements] = useState([]);
    const userId = localStorage.getItem("userId");
    
    useEffect(() => {
        const fetchEngagements = async () => {
            try {
                const response = await getEngagementDetails(eventId); 
                setEngagements(response.data); 
            } catch (error) {
                console.error('Error fetching engagements:', error);
            }
        };

        fetchEngagements();
    }, [eventId]);

       const handleVote = async (engagementId, optionIndex) => {
        try {
            await votePoll({ engagementId, optionIndex, userId }); 
            toast.success('Vote recorded successfully!');
            
            const updatedEngagements = engagements.map((engagement) => {
                if (engagement._id === engagementId) {
                    const updatedPoll = { ...engagement.poll };
                    updatedPoll.options[optionIndex].votes += 1;
                    updatedPoll.voters.push(userId); 
                    return { ...engagement, poll: updatedPoll };
                }
                return engagement;
            });
            setEngagements(updatedEngagements); 
        } catch (error) {
            toast.error('Error voting in poll: ' + error.message);
        }
    };

    return (
        <div className="event-details-container">
            <h1 className="event-title">{eventDetails.title}</h1>
            <p className="event-description">
                <strong>Description:</strong> {eventDetails.description}
            </p>
            <p className="event-date">
                <strong>Date:</strong> {new Date(eventDetails.date).toLocaleDateString()}
            </p>
            <p className="event-time">
                <strong>Time:</strong> {eventDetails.time}
            </p>
            <p className="event-location">
                <strong>Location:</strong> {eventDetails.location.city}
            </p>
            <p className="event-ticketing">
                <strong>Ticketing:</strong> {eventDetails.ticketing ? 'Available' : 'Not Available'}
            </p>
            <p className="event-privacy">
                <strong>Privacy:</strong> {eventDetails.privacy}
            </p>

            <div className="engagement-actions">
                {eventDetails.organizerId._id === userId  && <Link to={`/dashboard/${eventId}`}>
                    <button className="create-poll-btn">Dashboard</button>
                </Link>}
                <Link to={`/createpoll/${eventId}`}>
                    <button className="create-poll-btn">Create Poll</button>
                </Link>
                <Link to={`/creatediscussion/${eventId}`}>
                    <button className="create-discussion-btn">Create Discussion</button>
                </Link>
            </div>

            <div className="engagement-list">
                <h2>Polls & Discussions</h2>
                {engagements.length > 0 ? (
                    engagements.map((engagement) => (
                        <div key={engagement._id} className="engagement-item">
                            {engagement.type === 'poll' ? (
                                <div>
                                    <h3>{engagement.poll.question}</h3>
                                    <ul>
                                        {engagement.poll.options.map((option, index) => (
                                            <li key={index}
                                             className="poll-option"
                                             onClick={() => !engagement.poll.voters.includes(userId) && handleVote(engagement._id, index)} // Prevent voting if user has already voted
                                                style={{
                                                    cursor: engagement.poll.voters.includes(userId)
                                                        ? 'not-allowed'
                                                        : 'pointer',
                                                    color: engagement.poll.voters.includes(userId)
                                                        ? 'gray'
                                                        : 'black',
                                                }}
                                            >
                                                {option.option} - {option.votes} votes
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div>
                                    <p>{engagement.discussion.message}</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No polls or discussions yet.</p>
                )}
            </div>
        </div>
    );
};

export default EventDetails;

















