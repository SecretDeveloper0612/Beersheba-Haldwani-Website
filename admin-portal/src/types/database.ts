export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          name: string;
          role: "super_admin" | "editor";
          avatar_url: string | null;
          is_active: boolean;
          last_login: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["admin_users"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["admin_users"]["Insert"]>;
      };
      site_settings: {
        Row: {
          id: string;
          school_name: string;
          tagline: string | null;
          phone: string | null;
          email: string | null;
          address: string | null;
          facebook_url: string | null;
          youtube_url: string | null;
          instagram_url: string | null;
          whatsapp_number: string | null;
          marquee_text: string | null;
          admission_open: boolean;
          established_year: number | null;
          affiliation_board: string | null;
          affiliation_number: string | null;
          logo_url: string | null;
          favicon_url: string | null;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
      };
      homepage_content: {
        Row: {
          id: string;
          hero_heading: string | null;
          hero_subheading: string | null;
          hero_primary_btn_text: string | null;
          hero_primary_btn_url: string | null;
          hero_secondary_btn_text: string | null;
          hero_secondary_btn_url: string | null;
          hero_background_image: string | null;
          welcome_heading: string | null;
          welcome_text: string | null;
          welcome_image: string | null;
          show_stats: boolean;
          stats_students: string | null;
          stats_teachers: string | null;
          stats_classrooms: string | null;
          stats_years: string | null;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["homepage_content"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["homepage_content"]["Row"]>;
      };
      slider_images: {
        Row: {
          id: string;
          image_url: string;
          caption: string | null;
          link_url: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["slider_images"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["slider_images"]["Insert"]>;
      };
      homepage_highlights: {
        Row: {
          id: string;
          icon: string;
          title: string;
          description: string | null;
          link_url: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["homepage_highlights"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["homepage_highlights"]["Insert"]>;
      };
      about_content: {
        Row: {
          id: string;
          history_heading: string | null;
          history_text: string | null;
          mission_text: string | null;
          vision_text: string | null;
          principal_name: string | null;
          principal_message: string | null;
          principal_image: string | null;
          founder_name: string | null;
          founder_quote: string | null;
          header_image: string | null;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["about_content"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["about_content"]["Row"]>;
      };
      academic_programs: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          age_range: string | null;
          cover_image: string | null;
          highlights: string[];
          color_theme: string;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["academic_programs"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["academic_programs"]["Insert"]>;
      };
      facilities: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          full_description: string | null;
          cover_image: string | null;
          icon: string;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["facilities"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["facilities"]["Insert"]>;
      };
      gallery_albums: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          cover_image: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["gallery_albums"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["gallery_albums"]["Insert"]>;
      };
      gallery_images: {
        Row: {
          id: string;
          album_id: string | null;
          image_url: string;
          thumbnail_url: string | null;
          caption: string | null;
          alt_text: string | null;
          file_name: string | null;
          file_size: number | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["gallery_images"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["gallery_images"]["Insert"]>;
      };
      video_gallery: {
        Row: {
          id: string;
          title: string;
          video_url: string;
          thumbnail_url: string | null;
          source: string;
          duration: string | null;
          description: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["video_gallery"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["video_gallery"]["Insert"]>;
      };
      news_events: {
        Row: {
          id: string;
          title: string;
          slug: string | null;
          content: string | null;
          excerpt: string | null;
          featured_image: string | null;
          category: string;
          event_date: string | null;
          event_location: string | null;
          status: "published" | "draft";
          views: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["news_events"]["Row"], "id" | "created_at" | "updated_at" | "views">;
        Update: Partial<Database["public"]["Tables"]["news_events"]["Insert"]>;
      };
      admission_enquiries: {
        Row: {
          id: string;
          student_name: string;
          parent_name: string;
          phone: string;
          email: string | null;
          class_seeking: string;
          message: string | null;
          status: "new" | "contacted" | "pending" | "rejected" | "admitted";
          notes: string | null;
          source: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["admission_enquiries"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["admission_enquiries"]["Insert"]>;
      };
      transfer_certificates: {
        Row: {
          id: string;
          tc_number: string;
          student_name: string;
          father_name: string;
          mother_name: string | null;
          admission_number: string | null;
          class_at_leaving: string;
          date_of_admission: string | null;
          date_of_leaving: string;
          date_of_birth: string | null;
          reason_for_leaving: string | null;
          conduct: string;
          is_verified: boolean;
          remarks: string | null;
          document_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["transfer_certificates"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["transfer_certificates"]["Insert"]>;
      };
      seo_settings: {
        Row: {
          id: string;
          page_path: string;
          page_name: string;
          meta_title: string | null;
          meta_description: string | null;
          og_title: string | null;
          og_description: string | null;
          og_image: string | null;
          focus_keywords: string | null;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["seo_settings"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["seo_settings"]["Insert"]>;
      };
      media_library: {
        Row: {
          id: string;
          file_name: string;
          file_url: string;
          file_type: "image" | "video" | "document";
          file_size: number | null;
          mime_type: string | null;
          alt_text: string | null;
          folder: string;
          used_count: number;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["media_library"]["Row"], "id" | "created_at" | "used_count">;
        Update: Partial<Database["public"]["Tables"]["media_library"]["Insert"]>;
      };
      contact_enquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          status: "New" | "Replied" | "Closed";
          is_starred: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["contact_enquiries"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["contact_enquiries"]["Insert"]>;
      };
    };
  };
}

// Convenience type aliases
export type AdminUser = Database["public"]["Tables"]["admin_users"]["Row"];
export type HomepageContent = Database["public"]["Tables"]["homepage_content"]["Row"];
export type SliderImage = Database["public"]["Tables"]["slider_images"]["Row"];
export type HomepageHighlight = Database["public"]["Tables"]["homepage_highlights"]["Row"];
export type AboutContent = Database["public"]["Tables"]["about_content"]["Row"];
export type AcademicProgram = Database["public"]["Tables"]["academic_programs"]["Row"];
export type Facility = Database["public"]["Tables"]["facilities"]["Row"];
export type GalleryAlbum = Database["public"]["Tables"]["gallery_albums"]["Row"];
export type GalleryImage = Database["public"]["Tables"]["gallery_images"]["Row"];
export type VideoItem = Database["public"]["Tables"]["video_gallery"]["Row"];
export type NewsEvent = Database["public"]["Tables"]["news_events"]["Row"];
export type AdmissionEnquiry = Database["public"]["Tables"]["admission_enquiries"]["Row"];
export type ContactEnquiry = Database["public"]["Tables"]["contact_enquiries"]["Row"];
export type TransferCertificate = Database["public"]["Tables"]["transfer_certificates"]["Row"];
export type SeoSetting = Database["public"]["Tables"]["seo_settings"]["Row"];
export type MediaFile = Database["public"]["Tables"]["media_library"]["Row"];
export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];
