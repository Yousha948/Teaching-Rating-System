import express from 'express';
import {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
} from '../Controller/DepartmentController.js';

const router = express.Router();

// Create a new department
router.post('/', createDepartment); // POST: /api/departments

// Get all departments
router.get('/', getAllDepartments); // GET: /api/departments

// Get a department by ID
router.get('/:departmentId', getDepartmentById); // GET: /api/departments/:departmentId

// Update a department by ID
router.put('/:departmentId', updateDepartment); // PUT: /api/departments/:departmentId

// Delete a department by ID
router.delete('/:departmentId', deleteDepartment); // DELETE: /api/departments/:departmentId

export default router;
