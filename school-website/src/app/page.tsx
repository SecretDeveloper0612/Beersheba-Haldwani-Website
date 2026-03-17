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
import { server_query_function } from "@/lib/graphql";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const page = async () => {
  const newsDataResult = (await server_query_function(`
    query {
      newsEvents(orderBy: createdAt_DESC, first: 20) {
        id
        newsHeading
        newsImage {
          url
        }
        newsDesc {
         html
        }
      }
    }
  `)) as any;

  const query = `query MyQuery {
  imageGalleries(orderBy: createdAt_DESC, first: 12) {
    id
    heading
    images {
      url
    }
    banner {
      url
    }
  }
    haldwaniBlogs(orderBy: createdAt_DESC, first: 10) {
      id
      title
      slug
      shortDesc
      mainImage {
        url
      }
    }
    heroSliders(orderBy: slideOrder_ASC) {
      id
      title
      description
      slideOrder
      buttonText
      buttonLink
      image {
        url
      }
    }
    haldwaniHomes(first: 1) {
      welcomeHeading
      welcomeDescription
      homeVideoBanner {
        url
      }
      homeGallery {
        ... on Image {
          id
          homeGalleryImage {
            url
          }
        }
      }
      classXTopperHeading
      classXTopperDesc
      classXiiTopperHeading
      classXiiTopperDesc
      toppers {
        id
        class
        topperDetails {
          id
          name
          percentage
          subject
          topperImage {
            url
          }
        }
      }
      event {
        id
        day
        eventName
      }
    }
  }
`;

  try {
    const response = (await server_query_function(query)) as any;
    const homeData = response?.haldwaniHomes?.[0];
    const newsData = newsDataResult?.newsEvents || [];
    const imageGalleryData = response?.imageGalleries || [];
    const blogsData = response?.haldwaniBlogs || [];
    const eventsData = homeData?.event || [];
    const heroSliders = response?.heroSliders || [];

    // Transform data for components
    const featuredNews = newsData.map((news: any) => {
      let teaserImage = news.newsImage?.url || "/assets/image/placeholder.jpg";
      
      if (news.newsDesc?.html) {
        const matches = news.newsDesc.html.match(/<img[^>]+src="([^">]+)"/g);
        if (matches && matches.length >= 1) {
          const imgToPick = matches.length >= 2 ? matches[1] : matches[0];
          const srcMatch = imgToPick.match(/src="([^">]+)"/);
          if (srcMatch && srcMatch[1]) {
            teaserImage = srcMatch[1];
          }
        }
      }

      return {
        id: news.id,
        newsHeading: news.newsHeading,
        newsImage: { url: teaserImage }
      };
    });

    featuredNews.sort((a: any, b: any) => {
      if (a.newsHeading.includes("UDAY SAMMAN")) return -1;
      if (b.newsHeading.includes("UDAY SAMMAN")) return 1;
      return 0;
    });

    let galleryImages = [];
    if (Array.isArray(homeData?.homeGallery)) {
      galleryImages = homeData.homeGallery
        .flatMap((item: any) => item.homeGalleryImage || [])
        .map((img: any) => ({ url: img.url }))
        .filter((img: any) => img.url);
    }
    
    if (galleryImages.length === 0 && imageGalleryData.length > 0) {
      galleryImages = imageGalleryData.flatMap((item: any) => 
        item.images?.map((img: any) => ({ url: img.url })) || []
      ).filter((img: any) => img.url);
    }

    galleryImages = galleryImages.slice(0, 9);

    // Transforming heroSliders for HeroSection if available, fallback to homeVideoBanner
    let bannerData = heroSliders.length > 0 ? heroSliders.map((s: any) => ({
      url: s.image?.url,
      title: s.title,
      description: s.description,
      buttonText: s.buttonText,
      buttonLink: s.buttonLink
    })) : [];

    if (bannerData.length === 0) {
       const bannerVideos = homeData?.homeVideoBanner || [{ url: "/assets/videos/video.mp4" }];
       bannerData = bannerVideos.map((v: any) => ({ url: v.url }));
    }

    const toppersData = {
      allToppers: homeData?.toppers || [],
      classXHeading: homeData?.classXTopperHeading,
      classXDesc: homeData?.classXTopperDesc,
      classXiiHeading: homeData?.classXiiTopperHeading,
      classXiiDesc: homeData?.classXiiTopperDesc
    };

    return (
      <>
        <HeroSection video={[{ homeVideoBanner: bannerData }] as any} />
        <Video featured={featuredNews} />
        <About 
          heading={homeData?.welcomeHeading} 
          description={homeData?.welcomeDescription} 
        />
        <MissionAndValues />
        <Academics />
        <Why />
        <NewSection />
        <ToppersResult initialData={toppersData} />
        <Branches />
        <Gallery image={galleryImages} />
        <Events blogs={blogsData} events={eventsData} />
        <AdmissionEnquiry />
      </>
    );
  } catch (error) {
    console.error("❌ Homepage Fetch Error:", error);
    return (
      <>
        <HeroSection video={[{ homeVideoBanner: [{ url: "/assets/videos/video.mp4" }] }]} />
        <Video featured={[]} />
        <About />
        <MissionAndValues />
        <Academics />
        <Why />
        <NewSection />
        <ToppersResult />
        <Branches />
        <Gallery image={[]} />
        <Events blogs={[]} events={[]} />
        <AdmissionEnquiry />
      </>
    );
  }
};

export default page;
