import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Teachers.css';

function TeacherForm({ teacher, fetchTeachers, setSelectedTeacher }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
  });

  useEffect(() => {
    if (teacher && teacher.id) {
      setFormData({
        name: teacher.name,
        email: teacher.email,
        department: teacher.department,
      });
    }
  }, [teacher]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (teacher && teacher.id) {
        await axios.put(`/api/teachers/${teacher.id}`, formData);
      } else {
        await axios.post('/api/teachers', formData);
      }
      fetchTeachers();
      setSelectedTeacher(null);
    } catch (error) {
      console.error('Error saving teacher:', error);
    }
  };

  return (
    <div className="teacher-form">
      <h2>{teacher && teacher.id ? 'Edit Teacher' : 'Add New Teacher'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Teacher's Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Teacher's Email"
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
        <button type="button" onClick={() => setSelectedTeacher(null)}>Cancel</button>
      </form>
    </div>
  );
}

export default TeacherForm;
