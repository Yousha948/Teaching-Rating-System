import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentCourses.css';
import StudentCourseForm from './StudentCourseForm';

function StudentCoursesList() {
  const [studentCourses, setStudentCourses] = useState([]);
  const [selectedStudentCourse, setSelectedStudentCourse] = useState(null);

  useEffect(() => {
    fetchStudentCourses();
  }, []);

  const fetchStudentCourses = async () => {
    try {
      const response = await axios.get('/api/student-courses');
      setStudentCourses(response.data);
    } catch (error) {
      console.error('Error fetching student courses:', error);
    }
  };

  const handleEdit = (studentCourse) => {
    setSelectedStudentCourse(studentCourse);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/student-courses/${id}`);
      fetchStudentCourses();
    } catch (error) {
      console.error('Error deleting student course:', error);
    }
  };

  return (
    <div className="student-courses-container">
      <h1>Student Courses...</h1>
      <button onClick={() => setSelectedStudentCourse({})}>Add New</button>
      <table className="student-courses-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentCourses.map((sc) => (
            <tr key={sc.id}>
              <td>{sc.id}</td>
              <td>{sc.studentName}</td>
              <td>{sc.courseName}</td>
              <td>
                <button onClick={() => handleEdit(sc)}>Edit</button>
                <button onClick={() => handleDelete(sc.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStudentCourse && (
        <StudentCourseForm
          studentCourse={selectedStudentCourse}
          fetchStudentCourses={fetchStudentCourses}
          setSelectedStudentCourse={setSelectedStudentCourse}
        />
      )}
    </div>
  );
}

export default StudentCoursesList;
