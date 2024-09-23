import axios from 'axios';

const API_URL = 'http://localhost:8081/api/v1'; 

// Login API
export const login = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};

// Register API
export const register = (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};
// profile
export const getUserProfile = () => {
    return axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

// update profile
export const updateUserProfile = (profileData) => {
    return axios.put(`${API_URL}/updateprofile`, profileData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

// delete profile
export const deleteUserAccount = () => {
    return axios.delete(`${API_URL}/deleteprofile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};


// Create Event API
export const createEvent = (eventData) => {
    const token = localStorage.getItem('token'); // Fetch token from localStorage
    if (!token) {
        console.error("No token found in localStorage");
    }

    return axios.post(`${API_URL}/create`, eventData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

// Get Events API
export const getEvents = () => {
    return axios.get(`${API_URL}/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

// Get Event Details API
export const getEventDetails = (eventId) => {
    return axios.get(`${API_URL}/details/${eventId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

// Attend Event API (Register user for an event)
export const attendEvent = (eventId, ticketData) => {
    return axios.post(`${API_URL}/attend/${eventId}`, ticketData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};


// Get Tickets API
export const getTickets = () => {
    return axios.get(`${API_URL}/gettickets`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

// Update Event API
export const updateEvent = (eventId, updatedData) => {
    return axios.put(`${API_URL}/update/${eventId}`, updatedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

// Delete Event API
export const deleteEvent = (eventId) => {
    return axios.delete(`${API_URL}/delete/${eventId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};


// Create Poll API
export const createPoll = (eventId,pollData) => {
    return axios.post(`${API_URL}/poll/${eventId}`, pollData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

// Create Discussion API
export const createDiscussion = (eventId,discussionData) => {
    return axios.post(`${API_URL}/discussion/${eventId}`, discussionData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

// Vote in Poll API
export const votePoll = (voteData) => {
    return axios.post(`${API_URL}/vote`, voteData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

// Get Engagement Details API
export const getEngagementDetails = (eventId) => {
    return axios.get(`${API_URL}/engagements/${eventId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};


  
  // Update the ticket status by ticket ID
  export const updateTicketStatus = async (ticketId, data) => {
    try {
      const response = await axios.put(`${API_URL}/updateticket/${ticketId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the JWT token in local storage
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating ticket status');
    }
  };


  export const getEventStats = (eventId) => {
    return axios.get(`${API_URL}/dashboard/${eventId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

export const submitContact = async (formData) => {
    return axios.post(`${API_URL}/contactSubmit`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });   
};


export const searchEvents = async (searchParams) => {
    try {
      return axios.get(`${API_URL}/search?${searchParams}`);
     
    } catch (error) {
      console.error(error);
      return null;
    }
  };