-- Beersheba School CMS - MySQL Database Schema (Hostinger Compatible)

-- Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('super_admin', 'editor') NOT NULL DEFAULT 'editor',
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id VARCHAR(36) PRIMARY KEY,
  school_name VARCHAR(255) DEFAULT 'Beersheba Sr Sec School',
  tagline VARCHAR(255) DEFAULT 'Academic Excellence Since 1977',
  phone VARCHAR(50) DEFAULT '+91-XXXXXXXXXX',
  email VARCHAR(255) DEFAULT 'info@beersheba.ac.in',
  address TEXT,
  facebook_url VARCHAR(255),
  youtube_url VARCHAR(255),
  instagram_url VARCHAR(255),
  whatsapp_number VARCHAR(50),
  marquee_text TEXT,
  admission_open BOOLEAN DEFAULT true,
  established_year INT DEFAULT 1977,
  affiliation_board VARCHAR(50) DEFAULT 'CBSE',
  affiliation_number VARCHAR(100),
  logo_url TEXT,
  favicon_url TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Homepage Slider
CREATE TABLE IF NOT EXISTS slider_images (
  id VARCHAR(36) PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT,
  link_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery Albums
CREATE TABLE IF NOT EXISTS gallery_albums (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  cover_image TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Gallery Images
CREATE TABLE IF NOT EXISTS gallery_images (
  id VARCHAR(36) PRIMARY KEY,
  album_id VARCHAR(36),
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  alt_text TEXT,
  file_name VARCHAR(255),
  file_size INT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (album_id) REFERENCES gallery_albums(id) ON DELETE SET NULL
);

-- Video Gallery
CREATE TABLE IF NOT EXISTS video_gallery (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  source ENUM('YouTube', 'Vimeo', 'Other') DEFAULT 'YouTube',
  duration VARCHAR(50),
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- News & Events
CREATE TABLE IF NOT EXISTS news_events (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  category ENUM('Event', 'Academic', 'Announcement', 'Workshop', 'News') DEFAULT 'Announcement',
  event_date DATE,
  event_location VARCHAR(255),
  status ENUM('published', 'draft') DEFAULT 'draft',
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Academic Programs
CREATE TABLE IF NOT EXISTS academic_programs (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  age_range VARCHAR(50),
  cover_image TEXT,
  highlights JSON,
  color_theme VARCHAR(50) DEFAULT 'blue',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Media Library
CREATE TABLE IF NOT EXISTS media_library (
  id VARCHAR(36) PRIMARY KEY,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_type ENUM('image', 'video', 'document', 'other') DEFAULT 'image',
  file_size INT,
  mime_type VARCHAR(100),
  folder VARCHAR(100) DEFAULT 'uploads',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admission Enquiries
CREATE TABLE IF NOT EXISTS admission_enquiries (
  id VARCHAR(36) PRIMARY KEY,
  student_name VARCHAR(255) NOT NULL,
  parent_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  class_seeking VARCHAR(50),
  message TEXT,
  status ENUM('new', 'contacted', 'admitted', 'rejected') DEFAULT 'new',
  source VARCHAR(50) DEFAULT 'website',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact Enquiries
CREATE TABLE IF NOT EXISTS contact_enquiries (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT,
  status ENUM('New', 'Read', 'Replied') DEFAULT 'New',
  is_starred BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Transfer Certificates
CREATE TABLE IF NOT EXISTS transfer_certificates (
  id VARCHAR(36) PRIMARY KEY,
  tc_number VARCHAR(100) UNIQUE NOT NULL,
  student_name VARCHAR(255) NOT NULL,
  father_name VARCHAR(255) NOT NULL,
  class_at_leaving VARCHAR(50),
  date_of_leaving DATE,
  admission_number VARCHAR(100),
  conduct VARCHAR(100) DEFAULT 'Good',
  is_verified BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- School Facilities
CREATE TABLE IF NOT EXISTS facilities (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon_name VARCHAR(50),
  image_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- About School Content
CREATE TABLE IF NOT EXISTS about_content (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) DEFAULT 'About Beersheba',
  content TEXT,
  vision TEXT,
  mission TEXT,
  principal_message TEXT,
  principal_name VARCHAR(255),
  principal_image TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Homepage Content (Singleton)
CREATE TABLE IF NOT EXISTS homepage_content (
  id VARCHAR(36) PRIMARY KEY,
  hero_title VARCHAR(255),
  hero_description TEXT,
  welcome_text TEXT,
  statistics JSON,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Homepage Highlights
CREATE TABLE IF NOT EXISTS homepage_highlights (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  link_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEO Settings
CREATE TABLE IF NOT EXISTS seo_settings (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  page_path VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255),
  description TEXT,
  keywords TEXT,
  og_image TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
