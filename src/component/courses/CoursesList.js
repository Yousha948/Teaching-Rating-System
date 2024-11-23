import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Courses.css';
import CourseForm from './CourseForm';

function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`/api/courses/${courseId}`);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="courses-container">
      <h1>Courses List</h1>
      <button onClick={() => setSelectedCourse({})}>Add New Course</button>
      <table className="courses-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.department}</td>
              <td>
                <button onClick={() => handleEdit(course)}>Edit</button>
                <button onClick={() => handleDelete(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCourse && <CourseForm course={selectedCourse} fetchCourses={fetchCourses} setSelectedCourse={setSelectedCourse} />}
    </div>
  );
}

export default CoursesList;
