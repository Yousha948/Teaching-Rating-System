import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Courses.css';

function CourseForm({ course, fetchCourses, setSelectedCourse }) {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
  });

  useEffect(() => {
    if (course && course.id) {
      setFormData({
        name: course.name,
        department: course.department,
      });
    }
  }, [course]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (course && course.id) {
        await axios.put(`/api/courses/${course.id}`, formData);
      } else {
        await axios.post('/api/courses', formData);
      }
      fetchCourses();
      setSelectedCourse(null);
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  return (
    <div className="course-form">
      <h2>{course && course.id ? 'Edit Course' : 'Add New Course'}</h2>
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
  );
}

export default CourseForm;
