import React, { useState, useEffect } from 'react';
import './Ratings.css';

function RatingsList() {
  const [ratings, setRatings] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [formData, setFormData] = useState({
    courseName: '',
    teacherName: '',
    ratingValue: '',
  });

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await fetch('/api/ratings'); // Using fetch instead of axios
      const data = await response.json();
      setRatings(data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const handleEdit = (rating) => {
    setSelectedRating(rating);
    setFormData({
      courseName: rating.courseName,
      teacherName: rating.teacherName,
      ratingValue: rating.ratingValue,
    });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/ratings/${id}`, {
        method: 'DELETE', // Using DELETE method
      });
      fetchRatings(); // Re-fetch the list after deletion
    } catch (error) {
      console.error('Error deleting rating:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedRating && selectedRating.id) {
        // Using fetch with PUT method to update a rating
        await fetch(`/api/ratings/${selectedRating.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Using fetch with POST method to create a new rating
        await fetch('/api/ratings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      fetchRatings();
      setSelectedRating(null); // Reset after saving
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  return (
    <div className="ratings-container">
      <h1>Ratings</h1>
      <button onClick={() => setSelectedRating({})}>Add New Rating</button>
      <table className="ratings-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course</th>
            <th>Teacher</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((rating) => (
            <tr key={rating.id}>
              <td>{rating.id}</td>
              <td>{rating.courseName}</td>
              <td>{rating.teacherName}</td>
              <td>{rating.ratingValue}</td>
              <td>
                <button onClick={() => handleEdit(rating)}>Edit</button>
                <button onClick={() => handleDelete(rating.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for adding/editing ratings */}
      <div className="rating-form">
        <h2>{selectedRating && selectedRating.id ? 'Edit Rating' : 'Add New Rating'}</h2>
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
          <input
            type="number"
            name="ratingValue"
            value={formData.ratingValue}
            onChange={handleInputChange}
            placeholder="Rating (1-5)"
            required
            min="1"
            max="5"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setSelectedRating(null)}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default RatingsList;
