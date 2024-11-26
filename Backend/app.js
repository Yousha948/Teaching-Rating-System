import express from 'express';
import db from './Config/db.js'
import cors from 'cors'
import UserRoutes from './Routes/UserRoutes.js'
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/api/users', UserRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
