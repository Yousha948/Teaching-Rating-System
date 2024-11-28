import express from 'express';
import { 
    createRating, 
    getAllRatings, 
    getRatingById, 
    updateRating, 
    deleteRating 
} from '../Controller/RatingController.js';

const router = express.Router();

router.post('/', createRating);             // Create a new rating
router.get('/', getAllRatings);             // Get all ratings
router.get('/:ratingId', getRatingById);    // Get a specific rating by ID
router.put('/:ratingId', updateRating);     // Update a rating
router.delete('/:ratingId', deleteRating);  // Delete a rating

export default router;
