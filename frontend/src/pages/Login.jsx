// src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Api'; 
import { toast } from "react-toastify";
import '../css/Login.css'

function Login({setIsLogedIn}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('isLogedIn', 'true');
            localStorage.setItem('userId', response.data.user._id);
            console.log(response.data);
            console.log(response.data.token);
            setIsLogedIn(true); 
            console.log(response.data.user._id)
            toast.success("Login Successful!");
            navigate('/'); 
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            setError(errorMessage);
            console.error('Login failed:', errorMessage);
            toast.error(errorMessage);
        }
    };
    

    return (
        <div className="login-container">
        <div className="login-border">
        <div>
            <h2 className="login-title">Welcome Back</h2>
        </div>
            <form onSubmit={handleSubmit}>
            <label className='email-label'>
            <p className='email'>Email Address <sup className='star'>*</sup></p>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </label>
                <label className='password-label'>
                <p className='pass'>Password <sup className='star'>*</sup></p>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='password-field'
                />
                 </label>
                <button type="submit"  className="login-button">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
        </div>
    );
}

export default Login;
