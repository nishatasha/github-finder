import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../css/index.css';

const token = '';

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userResponse.data);

        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRepos(reposResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  const transitionSettings = {
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.96],
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: -50 }}
      transition={transitionSettings}
      className="user-container"
    >
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className="user-profile">
          <div className="user-info">
            <motion.img 
              src={user.avatar_url} 
              alt={`${user.login}'s avatar`} 
              className="user-avatar" 
              onError={(e) => {e.target.style.display='none'}} 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={transitionSettings}
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionSettings}
            >
              {user.name || user.login}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionSettings}
            >
              {user.bio}
            </motion.p>
            <div className="user-stats">
              <div className="user-stat">
                <span>{user.public_repos}</span>
                <p>Repositories</p>
              </div>
              <div className="user-stat">
                <span>{user.followers}</span>
                <p>Followers</p>
              </div>
              <div className="user-stat">
                <span>{user.following}</span>
                <p>Following</p>
              </div>
            </div>
            <motion.a 
              href={user.html_url} 
              className="user-link" 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionSettings}
            >
              Go to GitHub
            </motion.a>
          </div>
          <div className="user-repos">
            <h3>My repositories</h3>
            <ul>
              {repos.length > 0 ? repos.map((repo) => (
                <li key={repo.id} className="repo-item">
                  <div className="repo-header">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-name">
                      {repo.name}
                    </a>
                    <span className="repo-updated">
                      Updated on {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <p>{repo.description ? repo.description : "No description available"}</p>
                </li>
              )) : <p>No repositories found</p>}
            </ul>
          </div>
        </div>
      ) : (
        <p>User not found!</p>
      )}
    </motion.div>
  );
};

export default User;
