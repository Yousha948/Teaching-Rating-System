import React, { useState, useEffect } from 'react';
import './Students.css';

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    departmentId: '',
  });

  useEffect(() => {
    fetchStudents();
    fetchDepartments();
  }, []);

  // Fetch all students with their details
  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Fetch all departments for the dropdown
  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // Handle editing a student
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormData({
      firstName: student.FirstName,
      lastName: student.LastName,
      email: student.Email,
      departmentId: student.DepartmentID,
    });
  };

  // Handle deleting a student
  const handleDelete = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      await fetch(`/api/students/${studentId}`, {
        method: 'DELETE',
      });
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for adding/editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedStudent && selectedStudent.StudentID) {
        // Update existing student
        await fetch(`/api/students/${selectedStudent.StudentID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create a new student
        await fetch('/api/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      fetchStudents();
      setSelectedStudent(null); // Reset the selected student after saving
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        departmentId: '',
      }); // Clear the form
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  // Handle adding a new student
  const handleAddNew = () => {
    setSelectedStudent(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      departmentId: '',
    });
  };

  return (
    <div className="students-container">
      <h1>Students List</h1>
      <button onClick={handleAddNew}>Add New Student</button>

      {/* Students Table */}
      <table className="students-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.StudentID}>
              <td>{student.StudentID}</td>
              <td>{`${student.FirstName} ${student.LastName}`}</td>
              <td>{student.Email}</td>
              <td>{student.DepartmentName}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.StudentID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for adding/editing students */}
      <div className="student-form">
        <h2>{selectedStudent ? 'Edit Student' : 'Add New Student'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.DepartmentID} value={dept.DepartmentID}>
                {dept.Department_Name}
              </option>
            ))}
          </select>
          <button type="submit">Save</button>
          {selectedStudent && (
            <button type="button" onClick={() => setSelectedStudent(null)}>
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default StudentsList;
