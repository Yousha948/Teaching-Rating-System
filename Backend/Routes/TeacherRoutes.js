import express from 'express';
import { 
    createTeacher, 
    getAllTeachers, 
    getTeacherById, 
    updateTeacher, 
    deleteTeacher 
} from '../Controller/TeacherController.js';

const router = express.Router();

router.post('/', createTeacher);            // Create a new teacher
router.get('/', getAllTeachers);            // Get all teachers
router.get('/:teacherId', getTeacherById);  // Get a specific teacher by ID
router.put('/:teacherId', updateTeacher);   // Update a teacher
router.delete('/:teacherId', deleteTeacher); // Delete a teacher

export default router;
