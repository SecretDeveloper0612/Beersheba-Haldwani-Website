import mysql from 'mysql2/promise';

const isDBConfigured = 
  process.env.DB_USER && 
  process.env.DB_USER !== 'root' && 
  process.env.DB_USER !== 'uXXXXX_admin' &&
  process.env.DB_PASSWORD &&
  process.env.DB_PASSWORD !== 'your_password';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'beersheba_db',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create the connection pool lazily or only if configured
export const pool = isDBConfigured ? mysql.createPool(dbConfig) : null;

// Helper to execute queries
export async function query(sql: string, params?: any[]) {
  if (!pool) {
    return [];
  }
  
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database Query Error:', error);
    return [];
  }
}
