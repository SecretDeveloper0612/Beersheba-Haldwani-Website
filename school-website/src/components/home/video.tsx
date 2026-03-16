import Heading2 from "../heading2";
import VideoCard from "./video-card";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

// Define the Featured item type for better type safety
type FeaturedItem = {
  id: string;
  newsHeading: string;
  newsImage: { url: string };
};

const Video = ({ featured }: { featured: FeaturedItem[] }) => {
  return (
    <section className="relative mt-12 mb-20 lg:mb-24">
      {/* Background Layer with Purple Accent */}
      <div className="absolute inset-x-0 top-0 bottom-16 lg:bottom-20 bg-[#DED4F2]/50 -z-10" />
      
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="space-y-4 lg:space-y-6">
              <Heading2
                title="Leading School in City Since 1977"
                className="text-2xl sm:text-3xl lg:text-4xl"
              />
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Empowering Minds, Inspiring Futures: Since 1977, Beersheba School in
                Haldwani has been a beacon of educational excellence. With a rich
                legacy spanning over four decades, we shape tomorrow&apos;s leaders
                through academic rigor and holistic development.
              </p>
              <Link href={"/news-event"} className="inline-block pt-2">
                <Button size="lg" className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white px-6 lg:px-8 h-12 rounded-xl transition-all shadow-lg text-sm lg:text-base">
                  Explore Highlights
                </Button>
              </Link>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="flex justify-center lg:justify-end mt-6 lg:mt-0 pb-12 lg:pb-6">
            <Carousel className="w-full max-w-[280px] sm:max-w-[340px] relative mb-8 lg:mb-0">
              <CarouselContent>
                {featured.length > 0 ? featured.map((item) => (
                  <CarouselItem key={item.id}>
                    <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
                      <CardContent className="p-0">
                        <div className="relative group">
                          <Image
                            src={item.newsImage.url}
                            alt={`Featured news: ${item.newsHeading}`}
                            width={400}
                            height={400}
                            className="w-full aspect-square object-cover"
                          />
                        </div>
                        <div className="p-4 lg:p-5 text-center">
                          <Link href={`/news-event/${item.id}`}>
                            <p className="text-base lg:text-lg font-bold text-[#3B2565] line-clamp-2">
                               {item.newsHeading}
                            </p>
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#E74040] mt-1.5 block">
                               👉 View Details
                            </span>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )) : (
                  <CarouselItem>
                    <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white p-12 lg:p-20 text-center">
                       <p className="text-gray-400 font-medium italic">Discover our highlights</p>
                    </Card>
                  </CarouselItem>
                )}
              </CarouselContent>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                 <CarouselPrevious className="static translate-x-0 translate-y-0 h-9 w-9 lg:h-10 lg:w-10 border-[#3B2565]/20 hover:border-[#3B2565] hover:bg-[#3B2565] hover:text-white transition-all shadow-sm" />
                 <CarouselNext className="static translate-x-0 translate-y-0 h-9 w-9 lg:h-10 lg:w-10 border-[#3B2565]/20 hover:border-[#3B2565] hover:bg-[#3B2565] hover:text-white transition-all shadow-sm" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      {/* Feature Cards overlap */}
      <div className="container mx-auto px-4 mt-8 lg:-mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <VideoCard
            title="Campus"
            desc="State-of-the-art facilities and vibrant learning spaces."
            source="/assets/image/icon cool-icon-l19.svg"
            link="/image-gallery/cm5mnfbsx02mx07o1cneh7g2p"
          />
          <VideoCard
            title="Teacher"
            desc="Dedicated educators shaping bright futures with passion."
            source="/assets/image/icon cool-icon-l22.svg"
            link="/image-gallery/cm5mnegp902d807o727z5rmcy"
          />
          <VideoCard
            title="Library"
            desc="Vast collection of books and digital resources."
            source="/assets/image/icon cool-icon-l25.svg"
            link="/image-gallery/cm5moi6bh037107o75b1f654h"
          />
          <VideoCard
            title="Smart School"
            desc="Cutting-edge technology enhancing learning."
            source="/assets/image/icon cool-icon-l28.svg"
            link="/image-gallery/cm5moitf803ei07o1bwivnwd7"
          />
        </div>
      </div>
    </section>
  );
};

export default Video;
