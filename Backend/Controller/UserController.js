import pool from '../Config/db.js';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Optionally, you can use JWT for session management

console.log('UserController is being loaded');

// Register a new user
export const registerUser = (req, res) => {
    const { firstName, lastName, birthday, gender, email, phoneNumber, id, role, password } = req.body; // Accept raw password here

    // Hash the password before storing it
    bcrypt.hash(password, 10, (err, hashedPassword) => {  // Use password, not passwordHash
        if (err) {
            return res.status(500).json({ error: 'Error hashing password' });
        }

        // SQL query to insert the new user into the database
        const sql = `
            INSERT INTO Users (FirstName, LastName, Birthday, Gender, Email, PhoneNumber, ID, Role, PasswordHash)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        pool.query(sql, [firstName, lastName, birthday, gender, email, phoneNumber, id, role, hashedPassword], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Database error during registration' });
            }
            res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
        });
    });
};



// Get all users
export const getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM Users';
    pool.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to retrieve users' });
        }
        res.json(results);
    });
};

// Delete a user by ID
export const deleteUser = (req, res) => {
    const { userId } = req.params;
    const sql = 'DELETE FROM Users WHERE UserID = ?';

    pool.query(sql, [userId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to delete user' });
        }
        res.json({ message: 'User deleted successfully' });
    });
};

// Login user
export const loginUser = (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM Users WHERE Email = ?';
    pool.query(sql, [email], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database error during login' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0]; // Assuming email is unique, there will be only one result

        // Compare provided password with stored hashed password
        bcrypt.compare(password, user.PasswordHash, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: 'Error comparing passwords' });
            }
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Optionally, create a JWT token (if you're using JWT for session)
            const token = jwt.sign({ userId: user.UserID, role: user.Role }, 'your_secret_key', { expiresIn: '1h' });

            res.json({
                message: 'Login successful',
                token, // Send the token if using JWT
            });
        });
    });
};
