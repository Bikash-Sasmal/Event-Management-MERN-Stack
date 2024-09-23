import React from 'react';
import '../css/NotFound.css'

function NotFound() {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404 Not Found</h1>
            <p className="not-found-message">
                The page you are looking for does not exist.
            </p>
        </div>
    );
}

export default NotFound;
