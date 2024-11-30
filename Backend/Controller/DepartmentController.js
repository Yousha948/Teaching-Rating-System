import pool from '../Config/db.js';

// Create a new department
export const createDepartment = async (req, res) => {
    const { departmentName } = req.body; // `departmentName` corresponds to `DepartmentName` in your database

    try {
        const [result] = await pool.execute(
            `
            INSERT INTO Departments (DepartmentName)
            VALUES (?)
        `,
            [departmentName]
        );

        res.status(201).json({ message: 'Department created successfully', departmentId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create department', details: error.message });
    }
};

// Get all departments
export const getAllDepartments = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `
            SELECT DepartmentID, DepartmentName 
            FROM Departments
        `
        );

        res.json(rows); // Returns an array of departments
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve departments', details: error.message });
    }
};

// Get a specific department by ID
export const getDepartmentById = async (req, res) => {
    const { departmentId } = req.params;

    try {
        const [rows] = await pool.execute(
            `
            SELECT DepartmentID, DepartmentName
            FROM Departments
            WHERE DepartmentID = ?
        `,
            [departmentId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.json(rows[0]); // Return the department object
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve department', details: error.message });
    }
};

// Update a department
export const updateDepartment = async (req, res) => {
    const { departmentId } = req.params;
    const { departmentName } = req.body; // Updating `DepartmentName`

    try {
        const [result] = await pool.execute(
            `
            UPDATE Departments
            SET DepartmentName = ?
            WHERE DepartmentID = ?
        `,
            [departmentName, departmentId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.json({ message: 'Department updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update department', details: error.message });
    }
};

// Delete a department
export const deleteDepartment = async (req, res) => {
    const { departmentId } = req.params;

    try {
        const [result] = await pool.execute(
            `
            DELETE FROM Departments
            WHERE DepartmentID = ?
        `,
            [departmentId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete department', details: error.message });
    }
};
