import React from 'react';
import axios from 'axios';

const ProfileGoogle = () => {
  console.log('dsadsa');
  axios.get('http://localhost:5000/api/auth/oauth/google/token')    
    .then(resp => {
      console.log(resp);
      localStorage.setItem('token', resp.data);
    })
    .catch(err => {
      console.log(err);
    })
  
  return (
    <div className="profile-google-block"></div>
  );
};

export default ProfileGoogle;
