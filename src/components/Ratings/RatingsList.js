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
    CourseID: '',
    TeacherID: '',
    RatingValue: '',
  });
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchRatings();
    fetchCourses();
    fetchTeachers();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await fetch('/api/ratings');
      const data = await response.json();
      setRatings(data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/teachers/list');
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleEdit = (rating) => {
    setSelectedRating(rating);
    setFormData({
      CourseID: rating.CourseID,
      TeacherID: rating.TeacherID,
      RatingValue: rating.RatingValue,
    });
    setOpen(true);
  };

  const handleDelete = async (ratingId) => {
    try {
      await fetch(`/api/ratings/${ratingId}`, {
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
      if (selectedRating && selectedRating.RatingID) {
        // Update existing rating
        await fetch(`/api/ratings/${selectedRating.RatingID}`, {
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
    setFormData({ CourseID: '', TeacherID: '', RatingValue: '' });
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
              <TableRow key={rating.RatingID}>
                <TableCell>{rating.RatingID}</TableCell>
                <TableCell>{rating.CourseName}</TableCell>
                <TableCell>{rating.TeacherName}</TableCell>
                <TableCell>{rating.RatingValue}</TableCell>
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
                    onClick={() => handleDelete(rating.RatingID)}
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
              select
              label="Course"
              fullWidth
              variant="outlined"
              name="CourseID"
              value={formData.CourseID}
              onChange={handleInputChange}
              required
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              {courses.map((course) => (
                <option key={course.CourseID} value={course.CourseID}>
                  {course.CourseName}
                </option>
              ))}
            </TextField>
            <TextField
              margin="dense"
              select
              label="Teacher"
              fullWidth
              variant="outlined"
              name="TeacherID"
              value={formData.TeacherID}
              onChange={handleInputChange}
              required
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              {teachers.map((teacher) => (
                <option key={teacher.TeacherID} value={teacher.TeacherID}>
                  {teacher.FirstName} {teacher.LastName}
                </option>
              ))}
            </TextField>
            <TextField
              margin="dense"
              label="Rating (1-10)"
              type="number"
              fullWidth
              variant="outlined"
              name="RatingValue"
              value={formData.RatingValue}
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
