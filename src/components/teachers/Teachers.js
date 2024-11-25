import React, { useState, useEffect } from 'react';
import './Teacher.css';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/teachers'); // Using fetch instead of axios
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      department: teacher.department,
    });
  };

  const handleDelete = async (teacherId) => {
    try {
      await fetch(`/api/teachers/${teacherId}`, {
        method: 'DELETE',
      });
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTeacher && selectedTeacher.id) {
        // Using fetch with PUT method to update a teacher
        await fetch(`/api/teachers/${selectedTeacher.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Using fetch with POST method to create a new teacher
        await fetch('/api/teachers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      fetchTeachers();
      setSelectedTeacher(null); // Reset the selected teacher after saving
    } catch (error) {
      console.error('Error saving teacher:', error);
    }
  };

  return (
    <div className="teachers-container">
      <h1>Teachers List</h1>
      <button onClick={() => setSelectedTeacher({})}>Add New Teacher</button>
      <table className="teachers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.id}</td>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.department}</td>
              <td>
                <button onClick={() => handleEdit(teacher)}>Edit</button>
                <button onClick={() => handleDelete(teacher.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Teacher Form for adding or editing */}
      <div className="teacher-form">
        <h2>{selectedTeacher && selectedTeacher.id ? 'Edit Teacher' : 'Add New Teacher'}</h2>
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
    </div>
  );
}

export default Teachers;
