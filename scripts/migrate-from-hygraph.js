const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

dotenv.config({ path: path.resolve(__dirname, '../admin-portal/.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'beersheba_db',
  port: parseInt(process.env.DB_PORT || '3306'),
};

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
const token = process.env.HYGRAPH_TOKEN;

async function fetchHygraph(query) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify({ query })
  });
  
  const data = await response.json();
  if (data.errors) throw new Error("GraphQL Error: " + JSON.stringify(data.errors));
  return data.data;
}

async function migrate() {
  if (!endpoint) {
    console.error("❌ HYGRAPH_ENDPOINT missing in .env");
    return;
  }

  console.log("🚀 Starting Hygraph to MySQL Migration...");
  const pool = mysql.createPool(dbConfig);

  try {
    // 1. Gallery Migration
    console.log("📸 Fetching Gallery from Hygraph...");
    const galleryData = await fetchHygraph(`
      query {
        imageGalleries(first: 100) {
          id
          heading
          banner { url }
          items (first: 1000) { id url fileName }
        }
      }
    `);

    for (const gallery of (galleryData.imageGalleries || [])) {
      console.log(`   Processing Album: ${gallery.heading}`);
      await pool.execute(
        `INSERT INTO gallery_albums (id, name, cover_image) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)`,
        [gallery.id, gallery.heading, gallery.banner?.url || null]
      );
      
      if (gallery.items) {
        for (const img of gallery.items) {
          await pool.execute(
            `INSERT INTO gallery_images (id, album_id, image_url, file_name) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE image_url = VALUES(image_url)`,
            [img.id, gallery.id, img.url, img.fileName || null]
          );
        }
      }
    }

    // 2. News/Blogs Migration
    console.log("📰 Fetching News from Hygraph...");
    const blogData = await fetchHygraph(`
      query {
        blogHaldwanis(first: 100) {
          id
          newsHeading
          newsImage { url }
          newsDescription { markdown }
          createdAt
          updatedAt
        }
      }
    `);

    for (const blog of (blogData.blogHaldwanis || [])) {
      console.log(`   Processing News: ${blog.newsHeading}`);
      await pool.execute(
        `INSERT INTO news_events (id, title, status, content, featured_image, created_at, updated_at) 
         VALUES (?, ?, 'published', ?, ?, ?, ?) 
         ON DUPLICATE KEY UPDATE title = VALUES(title), content = VALUES(content)`,
        [blog.id, blog.newsHeading, blog.newsDescription?.markdown || "", blog.newsImage?.url || null, blog.createdAt, blog.updatedAt]
      );
    }

    // 3. Homepage & Toppers
    console.log("🏠 Fetching Homepage Data...");
    const homeData = await fetchHygraph(`
      query {
        haldwaniHomes(first: 1) {
          id
          welcomeHeading
          welcomeDescription
          homeVideoBanner { url }
          toppers {
            class
            topperDetails {
              id
              name
              percentage
              subject
              topperImage { url }
            }
          }
        }
      }
    `);

    if (homeData.haldwaniHomes && homeData.haldwaniHomes.length > 0) {
      const home = homeData.haldwaniHomes[0];
      console.log("   Processing Homepage Content");
      await pool.execute(
        `INSERT INTO homepage_content (id, hero_title, hero_description) 
         VALUES (?, ?, ?) 
         ON DUPLICATE KEY UPDATE hero_title = VALUES(hero_title)`,
        ["homepage-main", home.welcomeHeading, home.welcomeDescription]
      );

      if (home.homeVideoBanner) {
        console.log("   Processing Slider Images");
        for (let i = 0; i < home.homeVideoBanner.length; i++) {
          await pool.execute(
            `INSERT INTO slider_images (id, image_url, sort_order) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE image_url = VALUES(image_url)`,
            [uuidv4(), home.homeVideoBanner[i].url, i]
          );
        }
      }
    }

    console.log("✅ Migration completed successfully!");
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
  } finally {
    await pool.end();
  }
}

migrate();
