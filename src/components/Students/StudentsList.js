import React, { useState, useEffect } from 'react';
import './Students.css';

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students'); // Using fetch instead of axios
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      department: student.department,
    });
  };

  const handleDelete = async (studentId) => {
    try {
      await fetch(`/api/students/${studentId}`, {
        method: 'DELETE', // Using DELETE method
      });
      fetchStudents(); // Re-fetch the list after deletion
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedStudent && selectedStudent.id) {
        // Using fetch with PUT method to update a student
        await fetch(`/api/students/${selectedStudent.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Using fetch with POST method to create a new student
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
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <div className="students-container">
      <h1>Students List</h1>
      <button onClick={() => setSelectedStudent({})}>Add New Student</button>
      <table className="students-table">
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
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.department}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Student Form for adding or editing */}
      <div className="student-form">
        <h2>{selectedStudent && selectedStudent.id ? 'Edit Student' : 'Add New Student'}</h2>
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
    </div>
  );
}

export default StudentsList;
