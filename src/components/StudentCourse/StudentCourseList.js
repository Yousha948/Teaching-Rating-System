import React, { useState, useEffect } from 'react';
import './StudentCourses.css';

function StudentCoursesList() {
  const [studentCourses, setStudentCourses] = useState([]);
  const [selectedStudentCourse, setSelectedStudentCourse] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '', // Now using IDs for student and course
    courseId: '',
  });

  useEffect(() => {
    fetchStudentCourses();
  }, []);

  const fetchStudentCourses = async () => {
    try {
      const response = await fetch('/api/student-courses'); // Fetching the student-course relationships
      const data = await response.json();
      setStudentCourses(data);
    } catch (error) {
      console.error('Error fetching student courses:', error);
    }
  };

  const handleEdit = (studentCourse) => {
    setSelectedStudentCourse(studentCourse);
    setFormData({
      studentId: studentCourse.studentId, // Assuming studentId and courseId are used
      courseId: studentCourse.courseId,
    });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/student-courses/${id}`, {
        method: 'DELETE', // Deleting the relationship using DELETE method
      });
      fetchStudentCourses(); // Re-fetch after deletion
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
        // Using PUT method to update the student-course relationship
        await fetch(`/api/student-courses/${selectedStudentCourse.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Using POST method to create a new student-course relationship
        await fetch('/api/student-courses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      fetchStudentCourses(); // Refresh the list after saving
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
              <td>{sc.studentName}</td> {/* Displaying student name */}
              <td>{sc.courseName}</td> {/* Displaying course name */}
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
          {/* Dropdowns for selecting student and course */}
          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Student</option>
            {/* Replace with dynamically fetched student options */}
            {/* Example: */}
            <option value="1">John Doe</option>
            <option value="2">Jane Smith</option>
          </select>

          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Course</option>
            {/* Replace with dynamically fetched course options */}
            {/* Example: */}
            <option value="1">Math 101</option>
            <option value="2">Science 102</option>
          </select>

          <button type="submit">Save</button>
          <button type="button" onClick={() => setSelectedStudentCourse(null)}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default StudentCoursesList;
