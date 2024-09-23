
import React from 'react';
import '../css/About.css';

function About() {
    return (
        <div className='about-container'>
            <div className='about-content'>
                <h1 className='about-title'>About Our Event Management System</h1>
                <p className='about-description'>
                    Our platform is designed to simplify the way events are managed and experienced. From planning to execution, we provide powerful tools for organizers and a smooth experience for attendees.
                </p>

                <div className='mission'>
                    <h2>Our Mission</h2>
                    <p>
                        Our goal is to make event management easy, accessible, and stress-free for everyone. We strive to create a platform where organizers and attendees can connect, engage, and collaborate seamlessly.
                    </p>
                </div>

                <div className='values'>
                    <h2>Our Core Values</h2>
                    <ul>
                        <li><strong>Innovation:</strong> We are constantly improving our platform with the latest technology.</li>
                        <li><strong>Security:</strong> We prioritize the safety and privacy of our users.</li>
                        <li><strong>Customer-Centric:</strong> Our users' satisfaction is our top priority.</li>
                        <li><strong>Transparency:</strong> We believe in clear and open communication with our users.</li>
                    </ul>
                </div>

                <div className='cta-buttons'>
                    <a href='/contact' className='cta-button contact-btn'>Contact Us</a>
                </div>
            </div>
        </div>
    );
}

export default About;
