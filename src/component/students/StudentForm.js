import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Students.css';

function StudentForm({ student, fetchStudents, setSelectedStudent }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
  });

  useEffect(() => {
    if (student && student.id) {
      setFormData({
        name: student.name,
        email: student.email,
        department: student.department,
      });
    }
  }, [student]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (student && student.id) {
        await axios.put(`/api/students/${student.id}`, formData);
      } else {
        await axios.post('/api/students', formData);
      }
      fetchStudents();
      setSelectedStudent(null);
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <div className="student-form">
      <h2>{student && student.id ? 'Edit Student' : 'Add New Student'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Student's Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Student's Email"
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
        <button type="button" onClick={() => setSelectedStudent(null)}>Cancel</button>
      </form>
    </div>
  );
}

export default StudentForm;
