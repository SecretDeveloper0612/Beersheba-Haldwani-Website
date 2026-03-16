const mysql = require('mysql2/promise');
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

async function seedGalleryAlbums() {
  const albums = [
    { name: "Campus Life", description: "Daily activities and campus environment", sort_order: 1 },
    { name: "Annual Day 2024", description: "Highlights from the annual cultural program", sort_order: 2 },
    { name: "Sports Meet", description: "Athletic achievements and sports events", sort_order: 3 },
    { name: "Science Exhibition", description: "Student projects and scientific displays", sort_order: 4 },
  ];

  console.log("Seeding gallery albums to MySQL...");
  
  const pool = mysql.createPool(dbConfig);
  
  try {
    for (const album of albums) {
      const id = uuidv4();
      await pool.execute(
        `INSERT INTO gallery_albums (id, name, description, sort_order, is_active) 
         VALUES (?, ?, ?, ?, ?) 
         ON DUPLICATE KEY UPDATE 
         description = VALUES(description), 
         sort_order = VALUES(sort_order), 
         updated_at = NOW()`,
        [id, album.name, album.description, album.sort_order, true]
      );
    }
    console.log("Gallery albums seeded successfully in MySQL.");
  } catch (error) {
    console.error("Error seeding gallery albums in MySQL:", error);
  } finally {
    await pool.end();
  }
}

seedGalleryAlbums();
