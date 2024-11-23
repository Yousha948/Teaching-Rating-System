import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Teachers.css';
import TeacherForm from './TeacherForm';

function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleDelete = async (teacherId) => {
    try {
      await axios.delete(`/api/teachers/${teacherId}`);
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
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
      {selectedTeacher && <TeacherForm teacher={selectedTeacher} fetchTeachers={fetchTeachers} setSelectedTeacher={setSelectedTeacher} />}
    </div>
  );
}

export default TeachersList;
