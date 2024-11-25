import React, { useState, useEffect } from 'react';
import './Departments.css';

function DepartmentsList() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments'); // Using fetch instead of axios
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setFormData({
      name: department.name,
    });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/departments/${id}`, {
        method: 'DELETE', // Using DELETE method
      });
      fetchDepartments(); // Re-fetch the list after deletion
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedDepartment && selectedDepartment.id) {
        // Using fetch with PUT method to update a department
        await fetch(`/api/departments/${selectedDepartment.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Using fetch with POST method to create a new department
        await fetch('/api/departments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      fetchDepartments();
      setSelectedDepartment(null); // Reset after saving
    } catch (error) {
      console.error('Error saving department:', error);
    }
  };

  return (
    <div className="departments-container">
      <h1>Departments</h1>
      <button onClick={() => setSelectedDepartment({})}>Add New Department</button>

      {/* Departments Table */}
      <table className="departments-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.name}</td>
              <td>
                <button onClick={() => handleEdit(department)}>Edit</button>
                <button onClick={() => handleDelete(department.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for adding/editing departments */}
      <div className="department-form">
        <h2>{selectedDepartment && selectedDepartment.id ? 'Edit Department' : 'Add New Department'}</h2>
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
    </div>
  );
}

export default DepartmentsList;
