const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Mysql',
  database: 'Locations',
});

// Test the database connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the MySQL database successfully!');
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error('Failed to connect to the MySQL database:', error.message);
  }
})();

module.exports = pool;
