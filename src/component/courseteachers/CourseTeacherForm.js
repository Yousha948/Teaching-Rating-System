import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseTeachers.css';

function CourseTeacherForm({ courseTeacher, fetchCourseTeachers, setSelectedCourseTeacher }) {
  const [formData, setFormData] = useState({
    courseId: '',
    teacherId: '',
  });

  useEffect(() => {
    if (courseTeacher && courseTeacher.id) {
      setFormData({
        courseId: courseTeacher.courseId,
        teacherId: courseTeacher.teacherId,
      });
    }
  }, [courseTeacher]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (courseTeacher && courseTeacher.id) {
        await axios.put(`/api/course-teachers/${courseTeacher.id}`, formData);
      } else {
        await axios.post('/api/course-teachers', formData);
      }
      fetchCourseTeachers();
      setSelectedCourseTeacher(null);
    } catch (error) {
      console.error('Error saving course teacher:', error);
    }
  };

  return (
    <div className="course-teacher-form">
      <h2>{courseTeacher && courseTeacher.id ? 'Edit Course Teacher' : 'Add New Course Teacher'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="courseId"
          value={formData.courseId}
          onChange={handleInputChange}
          placeholder="Course ID"
          required
        />
        <input
          type="text"
          name="teacherId"
          value={formData.teacherId}
          onChange={handleInputChange}
          placeholder="Teacher ID"
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => setSelectedCourseTeacher(null)}>Cancel</button>
      </form>
    </div>
  );
}

export default CourseTeacherForm;
