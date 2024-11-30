import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

function AdminDashboard() {
  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-options">
        <Link to="/manage/users" className="admin-option">Manage Users</Link>
        <Link to="/manage/departments" className="admin-option">Manage Departments</Link>
        <Link to="/manage/courses" className="admin-option">Manage Courses</Link>
        <Link to="/manage/teachers" className="admin-option">Manage Teachers</Link>
        <Link to="/manage/students" className="admin-option">Manage Students</Link>
        <Link to="/manage/ratings" className="admin-option">Manage Ratings</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
