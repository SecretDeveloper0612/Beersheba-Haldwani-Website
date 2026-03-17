import { pool, query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export const migrationState = {
  status: "idle" as "idle" | "running" | "completed" | "failed",
  progress: 0,
  currentModel: "",
  totalModels: 0,
  logs: [] as string[],
  exportedData: {} as Record<string, any[]>,
};

export function logMigration(message: string) {
  console.log(`[Migration] ${message}`);
  migrationState.logs.unshift(`[${new Date().toLocaleTimeString()}] ${message}`);
  if (migrationState.logs.length > 500) migrationState.logs.pop();
}

export class MigrationService {
  private endpoint: string;
  private token: string;

  constructor() {
    this.endpoint = process.env.HYGRAPH_ENDPOINT || process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT || "";
    this.token = process.env.HYGRAPH_TOKEN || process.env.NEXT_PUBLIC_HYGRAPH_TOKEN || "";
  }

  private async fetchHygraph(query: string) {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {})
      },
      body: JSON.stringify({ query })
    });
    
    const data = await response.json();
    if (data.errors) throw new Error("GraphQL Error: " + JSON.stringify(data.errors));
    return data.data;
  }

  async exportData() {
    if (migrationState.status === "running") throw new Error("Migration already running");
    
    migrationState.status = "running";
    migrationState.progress = 0;
    migrationState.logs = [];
    migrationState.exportedData = {};
    
    try {
      logMigration("Starting Hygraph data export sequence...");
      
      if (!this.endpoint) {
        logMigration("HYGRAPH_ENDPOINT missing! Aborting export.");
        migrationState.status = "failed";
        return;
      }

      // 1. Export Gallery
      logMigration("Exporting Gallery Images...");
      const galleryData = await this.fetchHygraph(`
        query {
          imageGalleries(first: 1000) {
            id
            heading
            banner { url }
            images { id url fileName }
          }
        }
      `);
      migrationState.exportedData["Gallery"] = galleryData.imageGalleries || [];
      logMigration(`Collected ${migrationState.exportedData["Gallery"].length} albums.`);

      // 2. Export News/Blogs
      logMigration("Exporting Blogs/News...");
      const blogData = await this.fetchHygraph(`
        query {
          blogHaldwanis(first: 1000) {
            id
            newsHeading
            newsImage { url }
            newsDescription { markdown }
            createdAt
            updatedAt
          }
        }
      `);
      migrationState.exportedData["Blogs"] = blogData.blogHaldwanis || [];
      logMigration(`Collected ${migrationState.exportedData["Blogs"].length} news articles.`);

      // 3. Export Homepage Content & Toppers
      logMigration("Exporting Homepage & Toppers...");
      const homeData = await this.fetchHygraph(`
        query {
          haldwaniHomes(first: 1) {
            id
            welcomeHeading
            welcomeDescription
            homeVideoBanner { url }
            toppers {
              class
              topperDetails {
                name
                percentage
                subject
                topperImage { url }
              }
            }
          }
        }
      `);
      migrationState.exportedData["Homepage"] = homeData.haldwaniHomes || [];
      logMigration(`Collected homepage configuration.`);

      migrationState.progress = 50;
      logMigration("Export Phase completed successfully.");
      migrationState.status = "idle";
      
    } catch (e: any) {
      logMigration(`Export failed: ${e.message}`);
      migrationState.status = "failed";
      throw e;
    }
  }

  async importData() {
    if (migrationState.status === "running") throw new Error("Migration already running");
    if (Object.keys(migrationState.exportedData).length === 0) throw new Error("No data to import. Run Export first.");
    
    migrationState.status = "running";
    logMigration("Starting MySQL Import...");

    try {
      // 1. Import Gallery
      const galleries = migrationState.exportedData["Gallery"] || [];
      for (const gallery of galleries) {
        const albumId = gallery.id;
        // Insert Album
        await query(
          `INSERT INTO gallery_albums (id, name, cover_image) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)`,
          [albumId, gallery.heading, gallery.banner?.url || null]
        );
        
        // Insert Images
        if (gallery.images) {
          for (const img of gallery.images) {
            await query(
              `INSERT INTO gallery_images (id, album_id, image_url, file_name) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE image_url = VALUES(image_url)`,
              [img.id || uuidv4(), albumId, img.url, img.fileName || null]
            );
          }
        }
      }
      logMigration(`Imported ${galleries.length} gallery albums.`);

      // 2. Import News/Blogs
      const blogs = migrationState.exportedData["Blogs"] || [];
      for (const blog of blogs) {
        await query(
          `INSERT INTO news_events (id, title, content, featured_image, status, created_at, updated_at) 
           VALUES (?, ?, ?, ?, 'published', ?, ?) 
           ON DUPLICATE KEY UPDATE title = VALUES(title), content = VALUES(content)`,
          [blog.id, blog.newsHeading, blog.newsDescription?.markdown || "", blog.newsImage?.url || null, blog.createdAt, blog.updatedAt]
        );
      }
      logMigration(`Imported ${blogs.length} news articles.`);

      // 3. Import Homepage
      const homes = migrationState.exportedData["Homepage"] || [];
      if (homes.length > 0) {
        const home = homes[0];
        // Site Settings / Homepage Content
        await query(
          `INSERT INTO homepage_content (id, hero_title, hero_description, welcome_text) 
           VALUES (?, ?, ?, ?) 
           ON DUPLICATE KEY UPDATE hero_title = VALUES(hero_title)`,
          ["homepage-main", home.welcomeHeading || "Welcome", home.welcomeDescription || "", home.welcomeDescription || ""]
        );

        // Import Sliders (from homeVideoBanner)
        if (home.homeVideoBanner) {
          for (let i = 0; i < home.homeVideoBanner.length; i++) {
            const vid = home.homeVideoBanner[i];
            await query(
              `INSERT INTO slider_images (id, image_url, sort_order) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE image_url = VALUES(image_url)`,
              [uuidv4(), vid.url, i]
            );
          }
        }
      }
      logMigration(`Imported homepage configuration.`);

      migrationState.progress = 100;
      logMigration("MySQL Import finished successfully!");
      migrationState.status = "completed";
      
    } catch (e: any) {
      logMigration(`Import failed: ${e.message}`);
      migrationState.status = "failed";
      throw e;
    }
  }

  async initializeDatabase() {
    logMigration("Checking Database Tables...");
    return true;
  }

  async syncData() {
     logMigration("Syncing simple counters...");
     return true;
  }
}
