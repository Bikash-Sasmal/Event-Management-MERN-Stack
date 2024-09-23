// src/pages/Home.jsx

import React from 'react';
import '../css/Home.css';

function Home() {
    return (
        <div className='home-container'>
            <div className='home-content'>
                <h1 className='home-title'>Welcome to the Event Management System</h1>
                <p className='home-subtitle'>
                    Plan, manage, and enjoy events with ease. Whether you're an organizer or attendee, we provide all the tools you need for a seamless experience.
                </p>
                
                <div className='features'>
                    <h2>Why Choose Us?</h2>
                    <ul className='features-list'>
                        <li><strong>Seamless Event Planning:</strong> Organize events effortlessly with our intuitive tools.</li>
                        <li><strong>Real-Time Updates:</strong> Stay informed about event changes and updates instantly.</li>
                      
                        <li><strong>Interactive Engagement:</strong> Participate in live polls, discussions, and Q&A sessions.</li>
                        <li><strong>Personalized Experience:</strong> Browse events tailored to your preferences and interests.</li>
                    </ul>
                </div>

                <div className='testimonial-section'>
                    <h2>What Our Users Say</h2>
                    <div className='testimonial'>
                        <p>"This platform made event management so much easier! As an organizer, I can manage attendees, send updates, and track payments all in one place."</p>
                        <h4>- Event Organizer, John D.</h4>
                    </div>
                    <div className='testimonial'>
                        <p>"I love how easy it is to register for events and stay updated. The experience has been smooth and enjoyable every time."</p>
                        <h4>- Attendee, Sarah K.</h4>
                    </div>
                </div>

                <div className='cta-buttons'>
                    <a href='/login' className='cta-button login-btnn'>Login</a>
                    <a href='/register' className='cta-button register-btn'>Register</a>
                </div>
            </div>
        </div>
    );
}

export default Home;










