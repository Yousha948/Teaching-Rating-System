import React from 'react';
import './Auth.css';

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign In</h2>
        <form>
          <input type="text" placeholder="UserID or Email" className="input-box" />
          <input type="password" placeholder="Password" className="input-box" />
          <div className="options">
            <label>
              <input type="checkbox" /> Keep me logged in
            </label>
            <a href="/forgot-password" className="forgot-pass-link">Forgot Password?</a>
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup" className="signup-link">Sign Up</a></p>
      </div>
    </div>
  );
}

export default Login;
