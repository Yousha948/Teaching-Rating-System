import express from 'express';
import { registerUser, getAllUsers, deleteUser, loginUser } from '../Controller/UserController.js';

const router = express.Router();

router.post('/register', registerUser);  // Register a new user
router.post('/login', loginUser);        // Login a user
router.get('/', getAllUsers);            // Get all users
router.delete('/:userId', deleteUser);   // Delete a user by ID

export default router;
