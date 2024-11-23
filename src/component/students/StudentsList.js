import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Students.css';
import StudentForm from './StudentForm';

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`/api/students/${studentId}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
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
      {selectedStudent && <StudentForm student={selectedStudent} fetchStudents={fetchStudents} setSelectedStudent={setSelectedStudent} />}
    </div>
  );
}

export default StudentsList;
