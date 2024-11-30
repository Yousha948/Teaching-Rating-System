import React, { useState, useEffect } from 'react';
import './Teacher.css';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    UserID: '',
    DepartmentID: '',
    Specialty: '',
  });

  useEffect(() => {
    fetchTeachers();
    fetchDepartments();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/teachers');
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/departments');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      UserID: teacher.UserID,
      DepartmentID: teacher.DepartmentID,
      Specialty: teacher.Specialty,
    });
  };

  const handleDelete = async (TeacherID) => {
    try {
      await fetch(`http://localhost:5000/api/teachers/${TeacherID}`, {
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
      if (selectedTeacher && selectedTeacher.TeacherID) {
        // Update teacher
        await fetch(`http://localhost:5000/api/teachers/${selectedTeacher.TeacherID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new teacher
        await fetch('http://localhost:5000/api/teachers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      fetchTeachers();
      setSelectedTeacher(null); // Reset the selected teacher
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
            <th>TeacherID</th>
            <th>UserID</th>
            <th>Department</th>
            <th>Specialty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.TeacherID}>
              <td>{teacher.TeacherID}</td>
              <td>{teacher.UserID}</td>
              <td>{teacher.DepartmentName}</td>
              <td>{teacher.Specialty}</td>
              <td>
                <button onClick={() => handleEdit(teacher)}>Edit</button>
                <button onClick={() => handleDelete(teacher.TeacherID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Teacher Form */}
      <div className="teacher-form">
        <h2>{selectedTeacher && selectedTeacher.TeacherID ? 'Edit Teacher' : 'Add New Teacher'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            User ID:
            <input
              type="text"
              name="UserID"
              value={formData.UserID}
              onChange={handleInputChange}
              placeholder="Enter User ID"
              required
            />
          </label>
          <label>
            Department:
            <select
              name="DepartmentID"
              value={formData.DepartmentID}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.DepartmentID} value={dept.DepartmentID}>
                  {dept.DepartmentName}
                </option>
              ))}
            </select>
          </label>
          <label>
            Specialty:
            <input
              type="text"
              name="Specialty"
              value={formData.Specialty}
              onChange={handleInputChange}
              placeholder="Enter Specialty"
              required
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setSelectedTeacher(null)}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default Teachers;
