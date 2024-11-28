import pool from '../Config/db.js';

// Create a new student
export const createStudent = async (req, res) => {
    const { userId, departmentId, major, yearOfStudy } = req.body;

    try {
        const [result] = await pool.execute(`
            INSERT INTO Students (UserID, DepartmentID, Major, YearOfStudy)
            VALUES (?, ?, ?, ?)
        `, [userId, departmentId, major, yearOfStudy]);

        res.status(201).json({ message: 'Student created successfully', studentId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create student', details: error.message });
    }
};

// Get all students
export const getAllStudents = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                s.StudentID, 
                s.UserID, 
                u.FirstName, 
                u.LastName, 
                s.DepartmentID, 
                d.DepartmentName, 
                s.Major, 
                s.YearOfStudy 
            FROM Students s
            JOIN Users u ON s.UserID = u.UserID
            JOIN Departments d ON s.DepartmentID = d.DepartmentID
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve students', details: error.message });
    }
};

// Get a specific student by ID
export const getStudentById = async (req, res) => {
    const { studentId } = req.params;

    try {
        const [rows] = await pool.execute(`
            SELECT 
                s.StudentID, 
                s.UserID, 
                u.FirstName, 
                u.LastName, 
                s.DepartmentID, 
                d.DepartmentName, 
                s.Major, 
                s.YearOfStudy 
            FROM Students s
            JOIN Users u ON s.UserID = u.UserID
            JOIN Departments d ON s.DepartmentID = d.DepartmentID
            WHERE s.StudentID = ?
        `, [studentId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve student', details: error.message });
    }
};

// Update a student
export const updateStudent = async (req, res) => {
    const { studentId } = req.params;
    const { departmentId, major, yearOfStudy } = req.body;

    try {
        const [result] = await pool.execute(`
            UPDATE Students 
            SET DepartmentID = ?, Major = ?, YearOfStudy = ?
            WHERE StudentID = ?
        `, [departmentId, major, yearOfStudy, studentId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update student', details: error.message });
    }
};

// Delete a student
export const deleteStudent = async (req, res) => {
    const { studentId } = req.params;

    try {
        const [result] = await pool.execute(`
            DELETE FROM Students WHERE StudentID = ?
        `, [studentId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete student', details: error.message });
    }
};
