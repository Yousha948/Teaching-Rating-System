import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ratings.css';
import RatingForm from './RatingForm';

function RatingsList() {
  const [ratings, setRatings] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get('/api/ratings');
      setRatings(response.data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const handleEdit = (rating) => {
    setSelectedRating(rating);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/ratings/${id}`);
      fetchRatings();
    } catch (error) {
      console.error('Error deleting rating:', error);
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
      {selectedRating && (
        <RatingForm
          rating={selectedRating}
          fetchRatings={fetchRatings}
          setSelectedRating={setSelectedRating}
        />
      )}
    </div>
  );
}

export default RatingsList;
