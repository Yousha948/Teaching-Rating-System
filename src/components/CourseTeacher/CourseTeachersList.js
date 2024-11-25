import React, { useState, useEffect } from 'react';
import './CourseTeachers.css';

function CourseTeachersList() {
  const [courseTeachers, setCourseTeachers] = useState([]);
  const [selectedCourseTeacher, setSelectedCourseTeacher] = useState(null);
  const [formData, setFormData] = useState({
    courseName: '',
    teacherName: '',
  });

  useEffect(() => {
    fetchCourseTeachers();
  }, []);

  const fetchCourseTeachers = async () => {
    try {
      const response = await fetch('/api/course-teachers'); // Using fetch instead of axios
      const data = await response.json();
      setCourseTeachers(data);
    } catch (error) {
      console.error('Error fetching course teachers:', error);
    }
  };

  const handleEdit = (courseTeacher) => {
    setSelectedCourseTeacher(courseTeacher);
    setFormData({
      courseName: courseTeacher.courseName,
      teacherName: courseTeacher.teacherName,
    });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/course-teachers/${id}`, {
        method: 'DELETE', // Using DELETE method
      });
      fetchCourseTeachers(); // Re-fetch the list after deletion
    } catch (error) {
      console.error('Error deleting course teacher:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCourseTeacher && selectedCourseTeacher.id) {
        // Using fetch with PUT method to update a course-teacher relationship
        await fetch(`/api/course-teachers/${selectedCourseTeacher.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Using fetch with POST method to create a new course-teacher relationship
        await fetch('/api/course-teachers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      fetchCourseTeachers();
      setSelectedCourseTeacher(null); // Reset after saving
    } catch (error) {
      console.error('Error saving course-teacher:', error);
    }
  };

  return (
    <div className="course-teachers-container">
      <h1>Course Teachers</h1>
      <button onClick={() => setSelectedCourseTeacher({})}>Add New</button>

      {/* Course Teachers Table */}
      <table className="course-teachers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course</th>
            <th>Teacher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseTeachers.map((ct) => (
            <tr key={ct.id}>
              <td>{ct.id}</td>
              <td>{ct.courseName}</td>
              <td>{ct.teacherName}</td>
              <td>
                <button onClick={() => handleEdit(ct)}>Edit</button>
                <button onClick={() => handleDelete(ct.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for adding/editing course-teacher relationships */}
      <div className="course-teacher-form">
        <h2>{selectedCourseTeacher && selectedCourseTeacher.id ? 'Edit Course-Teacher' : 'Add New Course-Teacher'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            placeholder="Course Name"
            required
          />
          <input
            type="text"
            name="teacherName"
            value={formData.teacherName}
            onChange={handleInputChange}
            placeholder="Teacher Name"
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setSelectedCourseTeacher(null)}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default CourseTeachersList;