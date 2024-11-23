import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentCourses.css';

function StudentCourseForm({ studentCourse, fetchStudentCourses, setSelectedStudentCourse }) {
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
  });

  useEffect(() => {
    if (studentCourse && studentCourse.id) {
      setFormData({
        studentId: studentCourse.studentId,
        courseId: studentCourse.courseId,
      });
    }
  }, [studentCourse]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (studentCourse && studentCourse.id) {
        await axios.put(`/api/student-courses/${studentCourse.id}`, formData);
      } else {
        await axios.post('/api/student-courses', formData);
      }
      fetchStudentCourses();
      setSelectedStudentCourse(null);
    } catch (error) {
      console.error('Error saving student course:', error);
    }
  };

  return (
    <div className="student-course-form">
      <h2>{studentCourse && studentCourse.id ? 'Edit Student Course' : 'Add New Student Course'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={handleInputChange}
          placeholder="Student ID"
          required
        />
        <input
          type="text"
          name="courseId"
          value={formData.courseId}
          onChange={handleInputChange}
          placeholder="Course ID"
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => setSelectedStudentCourse(null)}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default StudentCourseForm;
