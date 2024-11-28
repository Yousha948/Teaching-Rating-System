import pool from '../Config/db.js';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; 

// Create a new teacher
export const createTeacher = async (req, res) => {
    const { userId, departmentId, specialty } = req.body;

    try {
        const [result] = await pool.execute(`
            INSERT INTO Teachers (UserID, DepartmentID, Specialty)
            VALUES (?, ?, ?)
        `, [userId, departmentId, specialty]);

        res.status(201).json({ message: 'Teacher created successfully', teacherId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create teacher', details: error.message });
    }
};

// Get all teachers
export const getAllTeachers = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                t.TeacherID, 
                t.UserID, 
                u.FirstName, 
                u.LastName, 
                t.DepartmentID, 
                d.DepartmentName, 
                t.Specialty 
            FROM Teachers t
            JOIN Users u ON t.UserID = u.UserID
            JOIN Departments d ON t.DepartmentID = d.DepartmentID
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve teachers', details: error.message });
    }
};

// Get a specific teacher by ID
export const getTeacherById = async (req, res) => {
    const { teacherId } = req.params;

    try {
        const [rows] = await pool.execute(`
            SELECT 
                t.TeacherID, 
                t.UserID, 
                u.FirstName, 
                u.LastName, 
                t.DepartmentID, 
                d.DepartmentName, 
                t.Specialty 
            FROM Teachers t
            JOIN Users u ON t.UserID = u.UserID
            JOIN Departments d ON t.DepartmentID = d.DepartmentID
            WHERE t.TeacherID = ?
        `, [teacherId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve teacher', details: error.message });
    }
};

// Update a teacher
export const updateTeacher = async (req, res) => {
    const { teacherId } = req.params;
    const { departmentId, specialty } = req.body;

    try {
        const [result] = await pool.execute(`
            UPDATE Teachers 
            SET DepartmentID = ?, Specialty = ?
            WHERE TeacherID = ?
        `, [departmentId, specialty, teacherId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        res.json({ message: 'Teacher updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update teacher', details: error.message });
    }
};

// Delete a teacher
export const deleteTeacher = async (req, res) => {
    const { teacherId } = req.params;

    try {
        const [result] = await pool.execute(`
            DELETE FROM Teachers WHERE TeacherID = ?
        `, [teacherId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete teacher', details: error.message });
    }
};
