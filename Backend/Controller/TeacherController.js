import pool from '../Config/db.js';
import bcrypt from 'bcrypt'; // For password hashing if needed in future
import jwt from 'jsonwebtoken'; // For JWT functionality if needed

// Create a new teacher
export const createTeacher = async (req, res) => {
    const { UserID, DepartmentID, Specialty } = req.body;

    try {
        const [result] = await pool.execute(`
            INSERT INTO Teachers (UserID, DepartmentID, Specialty)
            VALUES (?, ?, ?)
        `, [UserID, DepartmentID, Specialty]);

        res.status(201).json({ 
            message: 'Teacher created successfully', 
            TeacherID: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to create teacher', 
            details: error.message 
        });
    }
};

// Get all teachers
export const getAllTeachers = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                t.TeacherID, 
                t.UserID, 
                CONCAT(u.FirstName, ' ', u.LastName) AS FullName,
                t.DepartmentID, 
                d.DepartmentName, 
                t.Specialty 
            FROM Teachers t
            JOIN Users u ON t.UserID = u.UserID
            JOIN Departments d ON t.DepartmentID = d.DepartmentID
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to retrieve teachers', 
            details: error.message 
        });
    }
};

// Get a specific teacher by ID
export const getTeacherById = async (req, res) => {
    const { TeacherID } = req.params;

    try {
        const [rows] = await pool.execute(`
            SELECT 
                t.TeacherID, 
                t.UserID, 
                CONCAT(u.FirstName, ' ', u.LastName) AS FullName,
                t.DepartmentID, 
                d.DepartmentName, 
                t.Specialty 
            FROM Teachers t
            JOIN Users u ON t.UserID = u.UserID
            JOIN Departments d ON t.DepartmentID = d.DepartmentID
            WHERE t.TeacherID = ?
        `, [TeacherID]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to retrieve teacher', 
            details: error.message 
        });
    }
};

// Update a teacher
export const updateTeacher = async (req, res) => {
    const { TeacherID } = req.params;
    const { DepartmentID, Specialty } = req.body;

    try {
        const [result] = await pool.execute(`
            UPDATE Teachers 
            SET DepartmentID = ?, Specialty = ?
            WHERE TeacherID = ?
        `, [DepartmentID, Specialty, TeacherID]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        res.json({ message: 'Teacher updated successfully' });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to update teacher', 
            details: error.message 
        });
    }
};

// Delete a teacher
export const deleteTeacher = async (req, res) => {
    const { TeacherID } = req.params;

    try {
        const [result] = await pool.execute(`
            DELETE FROM Teachers WHERE TeacherID = ?
        `, [TeacherID]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to delete teacher', 
            details: error.message 
        });
    }
};
