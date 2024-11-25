import React, { useState, useEffect } from 'react';
import './Courses.css';

function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses'); // Using fetch instead of axios
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setFormData({
      name: course.name,
      department: course.department,
    });
  };

  const handleDelete = async (courseId) => {
    try {
      await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE', // Using DELETE method
      });
      fetchCourses(); // Re-fetch the list after deletion
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCourse && selectedCourse.id) {
        // Using fetch with PUT method to update a course
        await fetch(`/api/courses/${selectedCourse.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Using fetch with POST method to create a new course
        await fetch('/api/courses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      fetchCourses();
      setSelectedCourse(null); // Reset after saving
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

      {/* Form for adding/editing courses */}
      <div className="course-form">
        <h2>{selectedCourse && selectedCourse.id ? 'Edit Course' : 'Add New Course'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Course Name"
            required
          />
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="Department"
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setSelectedCourse(null)}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default CoursesList;
