import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Search = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      try {
        // Fetch user data
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const userData = response.data;
        // Redirect to user profile page with username as route parameter
        navigate(`/user/${username}`);
      } catch (error) {
        console.error('Error searching user:', error);
        // Handle error, e.g., display error message to user
      }
    }
  };

  return (
    <div className="container">
      {/* GitHub icon */}
      <div className="icon-container">
        <FontAwesomeIcon icon={faGithub} className='icon' />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            placeholder="User name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Search</button>
        </div>
      </form>
      <h1>Welcome to GitHub Finder</h1>
    </div>
  );
};

export default Search;
