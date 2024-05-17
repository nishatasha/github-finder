import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/index.css';

const token = process.env.REACT_APP_GITHUB_TOKEN;

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userResponse.data);

        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRepos(reposResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
          console.error('Error details:', error.response.data);
          setError(error.response.data);
        } else {
          console.error('Error details:', error.message);
          setError({ message: error.message });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  return (
    <div className="user-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : user ? (
        <div className="user-profile">
          <div className="user-info">
            <img 
              src={user.avatar_url} 
              alt={`${user.login}'s avatar`} 
              className="user-avatar" 
              onError={(e) => {e.target.style.display='none'}} 
            />
            <h2>{user.name || user.login}</h2>
            <p>{user.bio}</p>
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
            <a href={user.html_url} className="user-link" target="_blank" rel="noopener noreferrer">
              Go to GitHub
            </a>
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
                      Updated on {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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
    </div>
  );
};

export default User;
