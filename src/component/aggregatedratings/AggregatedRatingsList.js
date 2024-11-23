import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AggregatedRatings.css';

function AggregatedRatingsList() {
  const [aggregatedRatings, setAggregatedRatings] = useState([]);

  useEffect(() => {
    fetchAggregatedRatings();
  }, []);

  const fetchAggregatedRatings = async () => {
    try {
      const response = await axios.get('/api/aggregated-ratings');
      setAggregatedRatings(response.data);
    } catch (error) {
      console.error('Error fetching aggregated ratings:', error);
    }
  };

  return (
    <div className="aggregated-ratings-container">
      <h1>Aggregated Ratings</h1>
      <table className="aggregated-ratings-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Teacher</th>
            <th>Course</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {aggregatedRatings.map((rating) => (
            <tr key={rating.id}>
              <td>{rating.id}</td>
              <td>{rating.teacherName || 'N/A'}</td>
              <td>{rating.courseName || 'N/A'}</td>
              <td>{rating.averageRating.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AggregatedRatingsList;
