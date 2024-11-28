import express from 'express';
import { 
    createStudent, 
    getAllStudents, 
    getStudentById, 
    updateStudent, 
    deleteStudent 
} from '../Controller/StudentController.js';

const router = express.Router();

router.post('/', createStudent);            // Create a new student
router.get('/', getAllStudents);            // Get all students
router.get('/:studentId', getStudentById);  // Get a specific student by ID
router.put('/:studentId', updateStudent);   // Update a student
router.delete('/:studentId', deleteStudent); // Delete a student

export default router;
