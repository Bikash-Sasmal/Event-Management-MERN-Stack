import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, deleteUserAccount } from '../Api'; 
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css'

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    createdAt: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile()
      .then((res) => {

        setUser(res.data.data);
        console.log(res.data)
        console.log(res.data.data)

        setUpdatedName(res.data.data.name);
        console.log(res.data.data.name)
        setUpdatedEmail(res.data.data.email);
        console.log(res.data.data.email)
      })
      .catch((err) => console.error('Error fetching profile:', err));
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile({
        name: updatedName,
        email: updatedEmail
      });
      setUser({
        ...user,
        name: updatedName,
        email: updatedEmail
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount();
      navigate('/login');
    } catch (err) {
      console.error('Error deleting account:', err);
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <label>Name:</label>
        {isEditing ? (
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        ) : (
          <p>{user.name}</p>
        )}
      </div>
      <div className="profile-info">
        <label>Email:</label>
        {isEditing ? (
          <input
            type="email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
          />
        ) : (
          <p>{user.email}</p>
        )}
      </div>
      <div className="profile-buttons">
        {isEditing ? (
          <button onClick={handleSaveProfile}>Save</button>
        ) : (
          <button onClick={handleEditProfile}>Edit Profile</button>
        )}
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  );
};

export default Profile;