import React, { useState, useEffect } from 'react';
import './Courses.css';

function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    courseName: '',
    departmentId: '',
  });

  // Fetch courses and departments on component load
  useEffect(() => {
    fetchCourses();
    fetchDepartments();
  }, []);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/departments');
      if (!response.ok) throw new Error('Failed to fetch departments');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // Handle editing a course
  const handleEdit = (course) => {
    setSelectedCourse(course);
    setFormData({
      courseName: course.CourseName,
      departmentId: course.DepartmentID,
    });
  };

  // Handle deleting a course
  const handleDelete = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete course');
      fetchCourses(); // Refresh courses after deletion
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = selectedCourse && selectedCourse.CourseID ? 'PUT' : 'POST';
      const url = selectedCourse
        ? `http://localhost:5000/api/courses/${selectedCourse.CourseID}`
        : 'http://localhost:5000/api/courses';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save course');
      fetchCourses(); // Refresh courses after adding/editing
      setSelectedCourse(null); // Reset selection
      setFormData({ courseName: '', departmentId: '' }); // Reset form
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  return (
    <div className="courses-container">
      <h1>Courses List</h1>
      <button onClick={() => setSelectedCourse({})}>Add New Course</button>

      {/* Courses Table */}
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
            <tr key={course.CourseID}>
              <td>{course.CourseID}</td>
              <td>{course.CourseName}</td>
              <td>{course.DepartmentName}</td>
              <td>
                <button onClick={() => handleEdit(course)}>Edit</button>
                <button onClick={() => handleDelete(course.CourseID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for adding/editing courses */}
      <div className="course-form">
        <h2>{selectedCourse && selectedCourse.CourseID ? 'Edit Course' : 'Add New Course'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            placeholder="Course Name"
            required
          />
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department.DepartmentID} value={department.DepartmentID}>
                {department.DepartmentName}
              </option>
            ))}
          </select>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setSelectedCourse(null)}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default CoursesList;
