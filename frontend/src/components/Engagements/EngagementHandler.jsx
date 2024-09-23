import React from 'react';
import Poll from './Poll';
import Discussion from './Discussion';

const EngagementHandler = ({ eventId, engagementType, poll }) => {
    if (engagementType === 'poll') {
        return <Poll eventId={eventId} poll={poll} />;
    } else if (engagementType === 'discussion') {
        return <Discussion eventId={eventId} />;
    } else {
        return <p>No engagement available for this event.</p>;
    }
};

export default EngagementHandler;
