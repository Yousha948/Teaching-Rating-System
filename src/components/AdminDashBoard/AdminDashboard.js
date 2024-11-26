import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

function AdminDashboard() {
  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-options">
        <Link to="/users" className="admin-option">Manage Users</Link>
        <Link to="/departments" className="admin-option">Manage Departments</Link>
        <Link to="/courses" className="admin-option">Manage Courses</Link>
        <Link to="/teachers" className="admin-option">Manage Teachers</Link>
        <Link to="/students" className="admin-option">Manage Students</Link>
        <Link to="/ratings" className="admin-option">Manage Ratings</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
