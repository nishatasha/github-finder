import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Search = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      navigate(`/user/${username}`);
    }
  };

  return (
    <div className="container">
      <div className="icon-container">
        <FontAwesomeIcon icon={faGithub} className="icon" />
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
