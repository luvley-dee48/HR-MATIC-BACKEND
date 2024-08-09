import React, { useState } from 'react';

const Profile = ({ fullName, setFullName }) => {
  const [email, setEmail] = useState('stevenalo@gmail.com');

  const handleNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="/path/to/avatar.jpg" alt="Profile" className="profile-avatar" />
        <div className="profile-info">
          <h2>{fullName}</h2>
          <p>{email}</p>
        </div>
      </div>

      <div className="profile-body">
        <div className="profile-column">
          <div className="profile-field">
            <label>Full Name</label>
            <input 
              type="text" 
              value={fullName} 
              onChange={handleNameChange} 
              placeholder="Your Full Name" 
            />
          </div>
          <div className="profile-field">
            <label>Gender</label>
            <select>
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="profile-field">
            <label>Language</label>
            <select>
              <option>Select Language</option>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              {/* Add more languages as needed */}
            </select>
          </div>
        </div>

        <div className="profile-column">
          <div className="profile-field">
            <label>Nick Name</label>
            <input type="text" placeholder="Your Nick Name" />
          </div>
          <div className="profile-field">
            <label>Country</label>
            <select>
              <option>Select Country</option>
              <option>United States</option>
              <option>Canada</option>
              <option>Australia</option>
              {/* Add more countries as needed */}
            </select>
          </div>
          <div className="profile-field">
            <label>Time Zone</label>
            <select>
              <option>Select Your Time Zone</option>
              <option>GMT</option>
              <option>EST</option>
              <option>PST</option>
              {/* Add more time zones as needed */}
            </select>
          </div>
          <div className="profile-field">
            <label>My email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={handleEmailChange} 
              placeholder="Enter your email address" 
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
