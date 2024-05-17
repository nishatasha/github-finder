import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

const Search = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const userData = response.data;
        navigate(`/user/${username}`);
      } catch (error) {
        console.error('Error searching user:', error);
      }
    }
  };

  const transitionSettings = {
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.96],
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      transition={transitionSettings}
      className="container"
    >
      <div className="icon-container">
        <FontAwesomeIcon icon={faGithub} className='icon' />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <motion.input
            type="text"
            placeholder="User name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={transitionSettings}
          />
          <motion.button 
            type="submit"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={transitionSettings}
          >
            Search
          </motion.button>
        </div>
      </form>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionSettings}
      >
        Welcome to GitHub Finder
      </motion.h1>
    </motion.div>
  );
};

export default Search;
