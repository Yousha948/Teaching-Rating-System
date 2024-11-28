import express from 'express';
import {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
} from '../Controller/DepartmentController.js';

const router = express.Router();

router.post('/', createDepartment);              // Create a new department
router.get('/', getAllDepartments);              // Get all departments
router.get('/:departmentId', getDepartmentById); // Get a specific department by ID
router.put('/:departmentId', updateDepartment);  // Update a department
router.delete('/:departmentId', deleteDepartment); // Delete a department

export default router;
