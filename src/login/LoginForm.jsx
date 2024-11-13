// src/login/LoginForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { FaUserAlt, FaLock } from "react-icons/fa";

export const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // State to store error message
  const navigate = useNavigate();

  const handleAuth = async (endpoint) => {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'An error occurred.');
        return;
      }

      if (endpoint === 'login') {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        onLogin(username);
      } else if (endpoint === 'register') {
        // Optionally, auto-login after registration
        // Here, we'll just navigate to login page
      }

      navigate('/');
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    handleAuth('login');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    handleAuth('register');
  };

  return (
    <div className='wrapper'>
      <form className="login_only" onSubmit={handleLoginSubmit}>
        <h1>Login</h1>
        <div className='input-box'>
          <input
            type='text'
            placeholder='Username'
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(''); // Clear error on input change
            }}
          />
          <FaUserAlt className='icon' />
        </div>
        <div className='input-box'>
          <input
            type='password'
            placeholder='Password'
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(''); // Clear error on input change
            }}
          />
          <FaLock className='icon' />
        </div>

        <div className='remember-forgot'>
          <label><input type='checkbox'/>Remember me</label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit">Login</button>

        <div className="register-link">
          <p>Don't have an account? <a href='#' onClick={handleRegister}>Register</a></p>
        </div>

        {error && <div className="error-message">{error}</div>} {/* Display error message if set */}
      </form>
    </div>
  );
};
