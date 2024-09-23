import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import '../../css/Navbar.css'

const NavBar = (props) => {
    const { isLogedIn } = props;

 
    const handleLogout = async () => {
            localStorage.removeItem('isLogedIn');
            localStorage.removeItem('token');
            window.location.reload();
    };
    
    return (
        <div className='navbar-container'>
            <Link to="/" className='navbar-logo'>
                <img src={logo} alt="Logo" loading='lazy' />
            </Link>

            <nav>
                <ul className='navbar-nav'>
                    <li><NavLink to="/" className="active-link">Home</NavLink></li>
                    <li><NavLink to="/about" className="active-link">About</NavLink></li>
                    <li><NavLink to="/contact" className="active-link">Contact</NavLink></li>
                   
                    {isLogedIn && (
                        <>
                            <li><NavLink to="/events" className="active-link">Events</NavLink></li>
                            <li><NavLink to="/tickets" className="active-link">Tickets</NavLink></li>
                        </>
                    )}
                </ul>
            </nav>

            <div className='navbar-buttons'>
                {!isLogedIn ? (
                    <>
                        <Link to='/login'>
                            <button className='navbar-button'>Login</button>
                        </Link>
                        <Link to='/register'>
                            <button className='navbar-button'>Sign up</button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to='/profile'>
                            <button className='navbar-button'>Profile</button>
                        </Link>
                        <button className='navbar-button logout' onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;