import express from 'express';
import { 
    createTeacher, 
    getAllTeachers, 
    getTeacherById, 
    updateTeacher, 
    deleteTeacher 
} from '../Controller/TeacherController.js';

const router = express.Router();

// Route to create a new teacher
router.post('/create', createTeacher);            

// Route to get all teachers
router.get('/list', getAllTeachers);              

// Route to get a specific teacher by ID
router.get('/:TeacherID', getTeacherById);        

// Route to update a specific teacher
router.put('/:TeacherID', updateTeacher);        

// Route to delete a specific teacher
router.delete('/:TeacherID', deleteTeacher);     

export default router;
