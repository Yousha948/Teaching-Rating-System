import React from 'react';
import './UserDashboard.css'; // Import the CSS file for styling

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">User Dashboard</h1>
      <div className="dashboard-grid">
        
        {/* Profile Card */}
        <div className="dashboard-card">
          <h2>Profile</h2>
          <p>View and edit your personal details.</p>
          <a href="/profile">Go to Profile</a> {/* Example link */}
        </div>
        
        {/* Courses Card */}
        <div className="dashboard-card">
          <h2>Courses</h2>
          <p>Explore the courses you are enrolled in.</p>
          <a href="/courses">View Courses</a> {/* Example link */}
        </div>
        
        {/* Teachers Card */}
        <div className="dashboard-card">
          <h2>Teachers</h2>
          <p>See the list of teachers and their ratings.</p>
          <a href="/teachers">View Teachers</a> {/* Example link */}
        </div>

        {/* Ratings Card */}
        <div className="dashboard-card">
          <h2>Ratings</h2>
          <p>Rate your teachers and view your past ratings.</p>
          <a href="/ratings">Rate Now</a> {/* Example link */}
        </div>
      </div>
    </div>
  );
};


export default UserDashboard;