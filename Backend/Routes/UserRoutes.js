import express from 'express';
import { registerUser, getAllUsers, deleteUser, loginUser } from '../Controller/UserController.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);  // Register a new user

// Login a user
router.post('/login', loginUser);        // Login a user

// Get all users
router.get('/', getAllUsers);            // Get all users

// Delete a user by ID
router.delete('/:userId', deleteUser);   // Delete a user by ID

export default router;
