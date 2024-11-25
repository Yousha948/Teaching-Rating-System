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
        </div>
        
        {/* Courses Card */}
        <div className="dashboard-card">
          <h2>Courses</h2>
          <p>Explore the courses you are enrolled in.</p>
        </div>
        
        {/* Teachers Card */}
        <div className="dashboard-card">
          <h2>Teachers</h2>
          <p>See the list of teachers and their ratings.</p>
        </div>

        {/* Ratings Card */}
        <div className="dashboard-card">
          <h2>Ratings</h2>
          <p>Rate your teachers and view your past ratings.</p>
        </div>

        {/* Notifications Card */}
        <div className="dashboard-card">
          <h2>Notifications</h2>
          <p>Check the latest updates and announcements.</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
