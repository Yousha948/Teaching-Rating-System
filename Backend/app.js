import express from 'express';
import db from './Config/db.js'
import cors from 'cors'
import UserRoutes from './Routes/UserRoutes.js'
import TeacherRoutes from './Routes/TeacherRoutes.js'
import StudentRoutes from './Routes/StudentRoutes.js'
import RatingRoutes from './Routes/RatingRoutes.js'
import DepartmentRoutes from './Routes/DepartmentRoutes.js'
import CourseRoutes from './Routes/CourseRoutes.js'
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/api/users', UserRoutes);
app.use('/api/teachers', TeacherRoutes);
app.use('/api/students', StudentRoutes); 
app.use('/api/ratings', RatingRoutes);
app.use('/api/departments', DepartmentRoutes);
app.use('/api/courses', CourseRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
