import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';  // Import axios for API calls

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(''); // To handle error messages
  const [loading, setLoading] = useState(false); // To handle loading state

  const handleLogin = async (e) => {
    e.preventDefault();

    // Set loading state to true while waiting for the response
    setLoading(true);
    setError(''); // Reset error message before making the API call

    // Create login payload
    const payload = {
      email,
      password,
    };

    try {
      // Send login request to the backend API
      const response = await axios.post('http://localhost:5000/api/users/login', payload);

      // Check if login was successful
      if (response.data.token) {
        // If login is successful, store the token in localStorage or sessionStorage
        localStorage.setItem('token', response.data.token); // Store token in localStorage
        console.log('Login successful:', response.data.message);
        // Redirect to another page or take other actions on success
        window.location.href = '/dashboard'; // Example redirect
      }
    } catch (error) {
      // Handle any errors (e.g., wrong credentials)
      console.error('Login error:', error.response ? error.response.data.error : error.message);
      setError('Invalid credentials, please try again.');
    } finally {
      // Set loading state to false once the request is completed
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Teaching Rating System</h1>
      </div>
      <div className="login-form-container">
        <div className="shop-logo">
          {/* Add shop logo here */}
        </div>
        <div className="login-form">
          <h2>Sign In</h2>
          {error && <div className="error-message">{error}</div>} {/* Display error message if login fails */}
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember for 1 month?</label>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>
          <div className="login-options">
            <a href="/forgot-password">Forgot Password?</a>
            <a href="/signup">Or Create Account?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
