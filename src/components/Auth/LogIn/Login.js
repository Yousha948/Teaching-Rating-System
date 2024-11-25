import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login functionality here
    console.log('Logging in with:', email, password, rememberMe);
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
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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

            <button type="submit" className="login-button">Sign In</button>
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
