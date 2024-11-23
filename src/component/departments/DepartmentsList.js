import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Departments.css';
import DepartmentForm from './DepartmentForm';

function DepartmentsList() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('/api/departments'); // Replace with your API endpoint
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/departments/${id}`); // Replace with your API endpoint
      fetchDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  return (
    <div className="departments-container">
      <h1>Departments</h1>
      <button onClick={() => setSelectedDepartment({})}>Add New Department</button>
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
      {selectedDepartment && (
        <DepartmentForm
          department={selectedDepartment}
          fetchDepartments={fetchDepartments}
          setSelectedDepartment={setSelectedDepartment}
        />
      )}
    </div>
  );
}

export default DepartmentsList;
