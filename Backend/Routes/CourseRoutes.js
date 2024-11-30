import express from 'express';
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} from '../Controller/CourseController.js';

const router = express.Router();

// Create a new course
router.post('/', createCourse);

// Retrieve all courses (includes department information)
router.get('/', getAllCourses);

// Retrieve a specific course by ID
router.get('/:courseId', getCourseById);

// Update an existing course by ID
router.put('/:courseId', updateCourse);

// Delete a specific course by ID
router.delete('/:courseId', deleteCourse);

export default router;
