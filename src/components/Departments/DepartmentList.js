import React, { useState, useEffect } from 'react';
import './Departments.css';

function DepartmentsList() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formData, setFormData] = useState({
    departmentName: '',
  });

  useEffect(() => {
    fetchDepartments(); // Fetch data when the component loads
  }, []);

  // Fetch all departments from the backend
  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/departments'); // Ensure this matches your backend route
      if (!response.ok) throw new Error('Failed to fetch departments');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // Handle editing a department
  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setFormData({
      departmentName: department.DepartmentName, // Ensure the field matches your database
    });
  };

  // Handle deleting a department
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/departments/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete department');
      fetchDepartments(); // Refresh the department list
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedDepartment && selectedDepartment.DepartmentID) {
        // Update an existing department
        const response = await fetch(`/api/departments/${selectedDepartment.DepartmentID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Failed to update department');
      } else {
        // Create a new department
        const response = await fetch('/api/departments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Failed to create department');
      }
      fetchDepartments(); // Refresh the department list
      setSelectedDepartment(null);
      setFormData({ departmentName: '' }); // Reset the form
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
            <tr key={department.DepartmentID}>
              <td>{department.DepartmentID}</td>
              <td>{department.DepartmentName}</td>
              <td>
                <button onClick={() => handleEdit(department)}>Edit</button>
                <button onClick={() => handleDelete(department.DepartmentID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for adding/editing departments */}
      {selectedDepartment && (
        <div className="department-form">
          <h2>{selectedDepartment.DepartmentID ? 'Edit Department' : 'Add New Department'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleInputChange}
              placeholder="Department Name"
              required
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setSelectedDepartment(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default DepartmentsList;
