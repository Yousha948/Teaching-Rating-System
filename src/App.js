import logo from './logo.svg';

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './component/login/Login';
import Signup from './component/signup/Signup';
import AdminDashboard from './component/admin/AdminDashboard';
import DepartmentsList from './component/departments/DepartmentsList';
import CoursesList from './component/courses/CoursesList';
import TeachersList from './component/teachers/TeachersList';
import StudentsList from './component/students/StudentsList';
import AggregatedRatingsList from './component/aggregatedratings/AggregatedRatingsList';
import RatingsList from './component/ratings/RatingsList';
import NotificationsList from './component/notifications/NotificationsList';
// Import other components similarly...
// Import other components similarly...

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
        <Link to="/">Home</Link>
           <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/departments">Departments</Link>
          <Link to="/users">Users</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/teachers">Teachers</Link>
          <Link to="/students">Students</Link>
          <Link to="/ratings">Ratings</Link>
          <Link to="/aggregated-ratings">Aggregated Ratings</Link>
          <Link to="/notifications">Notifications</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Welcome to the Teaching Rating System</h1>} />
           <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/*<Route path="/users" element={<UsersList />} />*/}
          <Route path="/departments" element={<DepartmentsList/>}/>
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/teachers" element={<TeachersList />} />
          <Route path="/students" element={<StudentsList />} />
          <Route path="/ratings" element={<RatingsList />} />
          <Route path="/aggregated-ratings" element={<AggregatedRatingsList />} />
          <Route path="/notifications" element={<NotificationsList />} />
          {/* Add routes for other components */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
