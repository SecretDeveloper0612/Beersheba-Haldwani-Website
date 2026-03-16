import AdmissionEnquiry from "@/components/admission-enquiry";
import Branches from "@/components/branches";
import About from "@/components/home/about";
import Academics from "@/components/home/academics";
import Events from "@/components/home/events";
import Gallery from "@/components/home/gallery";
import HeroSection from "@/components/home/hero-section";
import MissionAndValues from "@/components/home/mission-values";
import NewSection from "@/components/home/new-section";
import ToppersResult from "@/components/home/toppers-result";
import Video from "@/components/home/video";
import Why from "@/components/home/why";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const page = async () => {
  // Fetch from MySQL instead of Supabase
  const [
    newsResponse,
    galleryResponse,
    bannerResponse
  ] = (await Promise.all([
    query("SELECT * FROM news_events WHERE status = 'published' ORDER BY created_at DESC LIMIT 6"),
    query("SELECT * FROM gallery_images WHERE is_active = true ORDER BY created_at DESC LIMIT 6"),
    query("SELECT * FROM slider_images WHERE is_active = true ORDER BY sort_order"),
  ])) as any[][];

  // Transform data for components
  const featuredNews = newsResponse?.map(news => ({
    id: news.id,
    newsHeading: news.title,
    newsImage: { url: news.featured_image || "/assets/image/placeholder.jpg" }
  })) || [];

  const galleryImages = galleryResponse?.map(img => ({
    url: img.image_url
  })) || [];

  // Match the specific structure HeroSection/Slider expects
  const bannerVideoStructure = [
    {
      homeVideoBanner: bannerResponse?.map(banner => ({
        url: banner.image_url
      })) || [{ url: "/assets/video/school-banner.mp4" }]
    }
  ];

  return (
    <>
      <HeroSection video={bannerVideoStructure} />
      <Video featured={featuredNews} />
      <About />
      <MissionAndValues />
      <Academics />
      <Why />
      <NewSection />
      <ToppersResult />
      <Branches />
      <Gallery
        image={galleryImages}
      />
      <Events blogs={[]} events={[]} />
      <AdmissionEnquiry />
    </>
  );
};

export default page;
