import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Departments.css';

function DepartmentForm({ department, fetchDepartments, setSelectedDepartment }) {
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    if (department && department.id) {
      setFormData({ name: department.name });
    }
  }, [department]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (department && department.id) {
        // Update department
        await axios.put(`/api/departments/${department.id}`, formData); // Replace with your API endpoint
      } else {
        // Add new department
        await axios.post('/api/departments', formData); // Replace with your API endpoint
      }
      fetchDepartments();
      setSelectedDepartment(null);
    } catch (error) {
      console.error('Error saving department:', error);
    }
  };

  return (
    <div className="department-form">
      <h2>{department && department.id ? 'Edit Department' : 'Add New Department'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Department Name"
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => setSelectedDepartment(null)}>Cancel</button>
      </form>
    </div>
  );
}

export default DepartmentForm;
