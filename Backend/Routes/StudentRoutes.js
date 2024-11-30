import express from 'express';
import { 
    createStudent, 
    getAllStudents, 
    getStudentById, 
    updateStudent, 
    deleteStudent 
} from '../Controller/StudentController.js';

const router = express.Router();

// Route to create a new student
// Expects: { userId, departmentId, major, yearOfStudy } in the request body
router.post('/', createStudent);

// Route to retrieve all students
// Returns: Enriched student data including FullName, Email, DepartmentName
router.get('/', getAllStudents);

// Route to retrieve a specific student by ID
// Returns: Enriched data for the student with given StudentID
router.get('/:studentId', getStudentById);

// Route to update a student's details
// Expects: { departmentId, major, yearOfStudy } in the request body
router.put('/:studentId', updateStudent);

// Route to delete a student by ID
router.delete('/:studentId', deleteStudent);

export default router;
