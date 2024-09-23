import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NavBar from './components/Header/Navbar';
import NotFound from './pages/Notfound';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile'
import Event from './components/Events/Event';
import CreateEvent from './components/Events/CreateEvent';
import RegisterEvent from './components/Events/RegisteEvent';
import Tickets from './components/Tickets/Tickets';
import TicketList from './components/Tickets/TicketList';
import EventDetails from './components/Events/EventDetails';
import GetEventDetails from './components/Events/GeteventDetails';
import Poll from './components/Engagements/Poll';
import Discussion from './components/Engagements/Discussion';
import UpdateEvent from './components/Events/UpdateEvent';
import Contact from './pages/Contact';
import About from './pages/About';



function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const loginStatus = localStorage.getItem('isLogedIn');

    if (token && loginStatus === 'true') {
        setIsLogedIn(true); 
    } else {
        setIsLogedIn(false); 
    }
}, []);


  return (
   <div className="custom-container">
    <NavBar isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        
        <Route path="/login" element={<Login setIsLogedIn={setIsLogedIn} />} />
        <Route path="/register" element={<Register setIsLogedIn={setIsLogedIn} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/events" element={<Event/>} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/registerevent/:eventId" element={<RegisterEvent />} />
        {/* <Route path="/events/all" element={<EventList />} /> */}
        
        {/* <Route path="/event/details/:eventId" element={<EventDetails />} /> */}
        <Route path="/details" element={<EventDetails />} />
        <Route path="/geteventdetails/:eventId" element={<GetEventDetails />} />
        <Route path="/updateevent/:eventId" element={<UpdateEvent />} />
        <Route path="/deleteevent/:eventId" element={<UpdateEvent />} />


        <Route path='/createpoll/:eventId' element={<Poll />} />
        <Route path='/creatediscussion/:eventId' element={<Discussion />} />

        <Route path="/tickets" element={<Tickets/>} />
        <Route path="/ticketlist" element={<TicketList/>} />


        <Route path="/dashboard/:eventId" element={<Dashboard />} />
        
    
        <Route path="*" element={<NotFound />} />
      </Routes>

      </div>
  
  );
}

export default App;

