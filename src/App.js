import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/LogIn/Login';
import './App.css';
import UsersList from './components/users/userlist';
import Teachers from './components/teachers/Teachers';
import UserDashboard from './components/UserDashboard/UserDashboard';
import SignUp from './components/Auth/SignUp/SignUp';
import NotificationsList from './components/Notifications/NotificationsList'
import StudentsList from './components/Students/StudentsList';
import StudentCoursesList from './components/StudentCourse/StudentCourseList';
import RatingsList from './components/Ratings/RatingsList';
import DepartmentsList from './components/Departments/DepartmentList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />\
        <Route path='signup' element={<SignUp/>}/>
        <Route path="/userlist" element={<UsersList />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path='/notifications' element={<NotificationsList/>}/>
        <Route path='/students' element={<StudentsList/>}/>
        <Route path='/studentcourses' element={<StudentCoursesList/>}/>
        <Route path='/ratings' element={<RatingsList/>}/>
        <Route path='/departments' element={<DepartmentsList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
