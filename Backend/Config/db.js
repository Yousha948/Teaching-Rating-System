import mysql from 'mysql2'

const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Replace with your MySQL username
  password: 'YoushA2002@',  // Replace with your MySQL password
  database: 'teaching_system',  // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
pool.connect((err) => {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
  });

export default pool;
