import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ratings.css';

function RatingForm({ rating, fetchRatings, setSelectedRating }) {
  const [formData, setFormData] = useState({
    courseId: '',
    teacherId: '',
    ratingValue: '',
  });

  useEffect(() => {
    if (rating && rating.id) {
      setFormData({
        courseId: rating.courseId,
        teacherId: rating.teacherId,
        ratingValue: rating.ratingValue,
      });
    }
  }, [rating]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (rating && rating.id) {
        await axios.put(`/api/ratings/${rating.id}`, formData);
      } else {
        await axios.post('/api/ratings', formData);
      }
      fetchRatings();
      setSelectedRating(null);
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  return (
    <div className="rating-form">
      <h2>{rating && rating.id ? 'Edit Rating' : 'Add New Rating'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="courseId"
          value={formData.courseId}
          onChange={handleInputChange}
          placeholder="Course ID"
          required
        />
        <input
          type="text"
          name="teacherId"
          value={formData.teacherId}
          onChange={handleInputChange}
          placeholder="Teacher ID"
          required
        />
        <input
          type="number"
          name="ratingValue"
          value={formData.ratingValue}
          onChange={handleInputChange}
          placeholder="Rating Value (1-5)"
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => setSelectedRating(null)}>Cancel</button>
      </form>
    </div>
  );
}

export default RatingForm;
