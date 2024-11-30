import express from 'express';
import { 
    createRating, 
    getAllRatings, 
    getRatingById, 
    updateRating, 
    deleteRating 
} from '../Controller/RatingController.js';

const router = express.Router();

// Routes for Ratings
router.post('/ratings', createRating);             // Create a new rating
router.get('/ratings', getAllRatings);             // Get all ratings
router.get('/ratings/:ratingId', getRatingById);   // Get a specific rating by ID
router.put('/ratings/:ratingId', updateRating);    // Update a rating by ID
router.delete('/ratings/:ratingId', deleteRating); // Delete a rating by ID

export default router;
