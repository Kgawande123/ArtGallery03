import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
    } else {
      const fetchProfile = async () => {
        try {
          const response = await axios.post('http://localhost:8000/api/auth/login/');
          const foundUser = response.data.find((u) => u.username === 'admin');
          setUser(foundUser || { error: 'User not found' });
        } catch (error) {
          console.error('Error fetching profile', error);
          setUser({ error: 'Profile could not be loaded' });
        } finally {
          setLoading(false); // End loading state
        }
      };
      fetchProfile();
    }
  }, [token]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : user?.error ? (
        <p>{user.error}</p>
      ) : (
        <div>
          <h2>Profile</h2>
          <p>Username: {user.username}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
