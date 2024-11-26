import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import './Ratings.css';

function RatingsList() {
  const [ratings, setRatings] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [formData, setFormData] = useState({
    courseName: '',
    teacherName: '',
    ratingValue: '',
  });
  const [open, setOpen] = useState(false);

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
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/ratings/${id}`, {
        method: 'DELETE',
      });
      fetchRatings();
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
        // Update existing rating
        await fetch(`/api/ratings/${selectedRating.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new rating
        await fetch('/api/ratings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      fetchRatings();
      handleClose();
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  const handleOpen = () => {
    setSelectedRating(null);
    setFormData({ courseName: '', teacherName: '', ratingValue: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRating(null);
  };

  return (
    <Container maxWidth="md" className="ratings-container">
      <Typography variant="h4" gutterBottom>
        Ratings
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '20px' }}>
        Add New Rating
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ratings.map((rating) => (
              <TableRow key={rating.id}>
                <TableCell>{rating.id}</TableCell>
                <TableCell>{rating.courseName}</TableCell>
                <TableCell>{rating.teacherName}</TableCell>
                <TableCell>{rating.ratingValue}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(rating)}
                    style={{ marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(rating.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding/Editing Ratings */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedRating ? 'Edit Rating' : 'Add New Rating'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              label="Course Name"
              type="text"
              fullWidth
              variant="outlined"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              label="Teacher Name"
              type="text"
              fullWidth
              variant="outlined"
              name="teacherName"
              value={formData.teacherName}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              label="Rating (1-5)"
              type="number"
              fullWidth
              variant="outlined"
              name="ratingValue"
              value={formData.ratingValue}
              onChange={handleInputChange}
              required
              inputProps={{ min: 1, max: 5 }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default RatingsList;
