import React, { useState, useEffect } from 'react';
import './StudentCourses.css';

function StudentCoursesList() {
  const [studentCourses, setStudentCourses] = useState([]);
  const [selectedStudentCourse, setSelectedStudentCourse] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    courseName: '',
  });

  useEffect(() => {
    fetchStudentCourses();
  }, []);

  const fetchStudentCourses = async () => {
    try {
      const response = await fetch('/api/student-courses'); // Using fetch instead of axios
      const data = await response.json();
      setStudentCourses(data);
    } catch (error) {
      console.error('Error fetching student courses:', error);
    }
  };

  const handleEdit = (studentCourse) => {
    setSelectedStudentCourse(studentCourse);
    setFormData({
      studentName: studentCourse.studentName,
      courseName: studentCourse.courseName,
    });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/student-courses/${id}`, {
        method: 'DELETE', // Using DELETE method
      });
      fetchStudentCourses(); // Re-fetch the list after deletion
    } catch (error) {
      console.error('Error deleting student course:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedStudentCourse && selectedStudentCourse.id) {
        // Using fetch with PUT method to update a student course
        await fetch(`/api/student-courses/${selectedStudentCourse.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Using fetch with POST method to create a new student course
        await fetch('/api/student-courses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      fetchStudentCourses();
      setSelectedStudentCourse(null); // Reset after saving
    } catch (error) {
      console.error('Error saving student course:', error);
    }
  };

  return (
    <div className="student-courses-container">
      <h1>Student Courses</h1>
      <button onClick={() => setSelectedStudentCourse({})}>Add New</button>

      {/* Student Courses Table */}
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

      {/* Form for adding/editing student courses */}
      <div className="student-course-form">
        <h2>{selectedStudentCourse && selectedStudentCourse.id ? 'Edit Student Course' : 'Add New Student Course'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            placeholder="Student's Name"
            required
          />
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            placeholder="Course Name"
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setSelectedStudentCourse(null)}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default StudentCoursesList;
