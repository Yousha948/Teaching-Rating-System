import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseTeachers.css';
import CourseTeacherForm from './CourseTeacherForm';

function CourseTeachersList() {
  const [courseTeachers, setCourseTeachers] = useState([]);
  const [selectedCourseTeacher, setSelectedCourseTeacher] = useState(null);

  useEffect(() => {
    fetchCourseTeachers();
  }, []);

  const fetchCourseTeachers = async () => {
    try {
      const response = await axios.get('/api/course-teachers');
      setCourseTeachers(response.data);
    } catch (error) {
      console.error('Error fetching course teachers:', error);
    }
  };

  const handleEdit = (courseTeacher) => {
    setSelectedCourseTeacher(courseTeacher);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/course-teachers/${id}`);
      fetchCourseTeachers();
    } catch (error) {
      console.error('Error deleting course teacher:', error);
    }
  };

  return (
    <div className="course-teachers-container">
      <h1>Course Teachers</h1>
      <button onClick={() => setSelectedCourseTeacher({})}>Add New</button>
      <table className="course-teachers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course</th>
            <th>Teacher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseTeachers.map((ct) => (
            <tr key={ct.id}>
              <td>{ct.id}</td>
              <td>{ct.courseName}</td>
              <td>{ct.teacherName}</td>
              <td>
                <button onClick={() => handleEdit(ct)}>Edit</button>
                <button onClick={() => handleDelete(ct.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCourseTeacher && (
        <CourseTeacherForm
          courseTeacher={selectedCourseTeacher}
          fetchCourseTeachers={fetchCourseTeachers}
          setSelectedCourseTeacher={setSelectedCourseTeacher}
        />
      )}
    </div>
  );
}

export default CourseTeachersList;
