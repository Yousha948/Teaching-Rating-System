import React from 'react';
import './Auth.css';

function Signup() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form>
          <input type="text" placeholder="Email" className="input-box" />
          <input type="text" placeholder="Name" className="input-box" />
          <input type="text" placeholder="Phone Number" className="input-box" />
          <input type="text" placeholder="UserID" className="input-box" />
          <input type="password" placeholder="Password" className="input-box" />
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
