import React, { useState } from 'react';
import { submitContact } from '../Api';
import '../css/Contact.css'
import { toast } from 'react-toastify';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitContact(formData);
            toast.success('Your message submited successfully');
            setSuccessMessage('Your message has been sent!');
            setFormData({ name: '', email: '', subject: '', message: '' }); 
        } catch (error) {
            toast.error('Failed to submit your message');
            setErrorMessage('Error submitting the form. Please try again.');
        }
    };

    return (
        <div className="contact-container">
        <div className='contact'>
        <h1>Contact Us</h1>        
           
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className='message'
                        required
                    ></textarea>
                </div>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
            </div>
        </div>
    );
};

export default Contact;
