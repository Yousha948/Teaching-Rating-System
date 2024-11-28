import express from 'express';
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} from '../Controller/CourseController.js';

const router = express.Router();

router.post('/', createCourse);            // Create a new course
router.get('/', getAllCourses);            // Get all courses
router.get('/:courseId', getCourseById);   // Get a specific course by ID
router.put('/:courseId', updateCourse);    // Update a course
router.delete('/:courseId', deleteCourse); // Delete a course

export default router;
