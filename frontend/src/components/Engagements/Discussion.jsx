
import React, { useState } from 'react';
import { createDiscussion } from '../../Api'; 
import { useParams } from 'react-router-dom'; 
import '../../css/Discussion.css'; 
import { toast } from 'react-toastify'; 

const Discussion = () => {
    const { eventId } = useParams(); 
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) {
            setErrorMessage('Please provide a discussion message.');
            return;
        }

        try {
            const discussionData = { message };
            await createDiscussion(eventId, discussionData);
            toast.success('Discussion created successfully!');
        } catch (error) {
            setErrorMessage('Error creating discussion: ' + error.message);
            toast.error('Failed to create discussion!');
        }
    };

    return (
        <div className="create-discussion-container">
            <h2>Create Discussion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter discussion message"
                    ></textarea>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Create Discussion</button>
            </form>
        </div>
    );
};

export default Discussion;













