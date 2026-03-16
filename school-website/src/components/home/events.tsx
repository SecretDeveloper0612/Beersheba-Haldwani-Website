import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Heading2 from "../heading2";
import Link from "next/link";

type EventsProps = {
  blogs: Blog[];
  events: SchoolEvent[];
};

const Events = ({ blogs, events }: EventsProps) => {
  return (
    <section className="py-8 lg:py-16 xl:py-20 container bg-gradient-to-br from-[#FDFCFE] via-[#F5F1FF] to-[#F1EAFF] rounded-[2.5rem] my-8 lg:my-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-6 lg:px-16 border border-purple-100 shadow-xl relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/20 blur-3xl rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/10 blur-3xl rounded-full -ml-32 -mb-32" />

      <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10">
        <div className="flex items-center gap-3 mb-6 lg:mb-8">
            <div className="w-2 h-8 bg-[#3B2565] rounded-full" />
            <Heading2 title="Latest News" className="!text-2xl lg:!text-3xl" />
        </div>
        
        <div className="w-full max-w-[340px] sm:max-w-md lg:max-w-none relative group pb-14 lg:pb-12">
          <Carousel opts={{ align: "start", loop: true }} className="w-full mb-10 lg:mb-0">
            <CarouselContent>
              {blogs.map((blog) => (
                <CarouselItem className="basis-full" key={blog?.id}>
                  <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-purple-50 h-full group/card transition-all duration-300 hover:shadow-2xl hover:border-purple-200">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={blog?.mainImage?.url}
                        alt={blog?.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    </div>

                    <div className="p-5 lg:p-6 space-y-2">
                       <Link href={`/blog/${blog?.slug}`} className="inline-block">
                        <h3 className="text-[#3B2565] text-lg lg:text-xl font-extrabold tracking-tight leading-snug group-hover/card:text-[#E74040] transition-colors line-clamp-2">
                          {blog?.title}
                        </h3>
                      </Link>
                      <p className="text-gray-500 text-sm line-clamp-2 font-medium leading-relaxed">
                        {blog?.shortDesc}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
               <CarouselPrevious className="static translate-x-0 translate-y-0 h-9 w-9 lg:h-10 lg:w-10 border-purple-100 text-[#3B2565] hover:bg-[#3B2565] hover:text-white transition-all shadow-sm" />
               <CarouselNext className="static translate-x-0 translate-y-0 h-9 w-9 lg:h-10 lg:w-10 border-purple-100 text-[#3B2565] hover:bg-[#3B2565] hover:text-white transition-all shadow-sm" />
            </div>
          </Carousel>
        </div>
      </div>

      <div className="flex flex-col items-center lg:items-start text-center lg:text-left mt-12 lg:mt-0 relative z-10">
        <div className="flex items-center gap-3 mb-6 lg:mb-8">
            <div className="w-2 h-8 bg-[#E74040] rounded-full" />
            <Heading2 title="Upcoming Events" className="!text-2xl lg:!text-3xl" />
        </div>

        <div className="w-full max-w-[340px] sm:max-w-md lg:max-w-none">
          <div className="rounded-[2rem] bg-white/70 backdrop-blur-md h-[380px] lg:h-[400px] w-full overflow-y-auto shadow-xl border border-purple-50 p-4 lg:p-5 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
            {events?.length > 0 ? (
              events.map((event, index) => (
                <div key={event?.id} className="group mb-4 last:mb-0">
                  <div className="flex items-center gap-4 p-3 bg-white/50 hover:bg-white transition-all duration-300 rounded-[1.25rem] border border-transparent hover:border-purple-100 hover:shadow-md">
                    <div className="bg-gradient-to-br from-[#3B2565] to-[#2a1a4a] w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex flex-col justify-center items-center shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <span className="text-white text-xl lg:text-2xl font-black block leading-none">
                        {event?.day?.split(' ')[0]}
                      </span>
                      <span className="text-white/60 text-[8px] lg:text-[10px] uppercase font-bold tracking-widest mt-0.5 block">
                        {event?.day?.split(' ')[1] || 'DATE'}
                      </span>
                    </div>
                    <div className="flex-1 pr-2">
                      <p className="text-[#3B2565] text-sm lg:text-base font-bold leading-tight group-hover:text-[#E74040] transition-colors line-clamp-2">
                        {event?.eventName}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center p-6 text-gray-400 italic">
                <div className="text-center">
                    <p>No upcoming events</p>
                    <p className="text-xs mt-1">Check back later for updates</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
