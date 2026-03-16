const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'beersheba_db',
  port: parseInt(process.env.DB_PORT || '3306'),
};

async function seedAdmin() {
  const email = "website.beersheba@gmail.com";
  const password = "Beersheba2026";
  const name = "Super Admin";

  console.log(`Seeding admin user to MySQL: ${email}`);
  
  const pool = mysql.createPool(dbConfig);
  
  try {
    const password_hash = await bcrypt.hash(password, 10);
    const id = uuidv4();

    await pool.execute(
      `INSERT INTO admin_users (id, email, password_hash, name, role, is_active) 
       VALUES (?, ?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE 
       password_hash = VALUES(password_hash), 
       name = VALUES(name), 
       updated_at = NOW()`,
      [id, email, password_hash, name, 'super_admin', true]
    );

    console.log("Admin user seeded successfully in MySQL.");
  } catch (error) {
    console.error("Error seeding admin in MySQL:", error);
  } finally {
    await pool.end();
  }
}

seedAdmin();
