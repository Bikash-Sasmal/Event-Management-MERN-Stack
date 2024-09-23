import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../Api'; 
import '../css/Register.css'
import { toast } from "react-toastify";

function Register({setIsLogedIn}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setError('password do not match');
            toast.error('Passwords do not match');
            return;
        }
    
        try {
            await register({ name, email, password, confirmPassword });
            setIsLogedIn(true); 
            toast.success("Registration Successful!");
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.response.data.message);
            toast.error('Registration failed. Please try again.');
        }
    };
    

    return (
        <div className="register-container">
    <div className="register-border">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
            <label className="name-label">
                <p className="name">Name <sup className="star">*</sup></p>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                />
            </label>
            <label className="email-label">
                <p className="email">Email Address <sup className="star">*</sup></p>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
            </label>
            <label className="password-label">
                <p className="pass">Password <sup className="star">*</sup></p>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
            </label>
            <label className="confirm-password-label">
                <p className="confirm-pass">Confirm Password <sup className="star">*</sup></p>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                />
            </label>
            <button type="submit" className="register-button">Register</button>
        </form>
        {error && <p className="error-message">{error}</p>}
    </div>
</div>

    );
}

export default Register;
