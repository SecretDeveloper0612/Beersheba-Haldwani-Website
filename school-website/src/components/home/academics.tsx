import React from "react";
import Heading3 from "../heading3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { poppins } from "@/utils/font";
import { Button } from "../ui/button";
import Heading2 from "../heading2";

const Academics = () => {
  return (
    <section className="container mx-auto px-4 py-12 lg:py-24">
      <div className="text-center mb-10 lg:mb-12">
        <Heading3 title="Academics" />
        <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-sm lg:text-base font-medium">
          A legacy of excellence in education, nurturing students from their early years through high school graduation.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="early-years" className="w-full">
          <div className="flex md:justify-center mb-10 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide px-4">
            <TabsList className="bg-gray-100 p-1 lg:p-1.5 rounded-2xl flex h-auto gap-1 border border-gray-200 shrink-0 min-w-max">
              {["early-years", "elementry-school", "middle-school", "high-school", "examination"].map((v) => (
                <TabsTrigger 
                   key={v}
                   value={v} 
                   className="px-6 lg:px-8 py-2.5 lg:py-3 rounded-[0.9rem] lg:rounded-xl data-[state=active]:bg-[#3B2565] data-[state=active]:text-white transition-all duration-300 font-bold text-[10px] lg:text-sm whitespace-nowrap min-w-max"
                >
                  {v.replace("-", " ").toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {[
            {
              id: "early-years",
              tag: "Preschool & KG",
              title: "Early Years",
              img: "/assets/image/beershiba-2.jpeg",
              content: "Founded in 1977, Beersheba School in Haldwani began with just 60 children. Our co-educational English Medium school has been dedicated to providing a nurturing environment for early childhood development since its inception."
            },
            {
              id: "elementry-school",
              tag: "Grades 1-5",
              title: "Elementary",
              img: "/assets/image/elementary.jpg",
              content: "Our Elementary curriculum builds essential skills in reading, writing, mathematics, and science. We emphasize a balanced approach, integrating arts and technology to create a well-rounded learning experience."
            },
            {
              id: "middle-school",
              tag: "Grades 6-8",
              title: "Middle School",
              img: "/assets/image/middle.jpg",
              content: "In Middle School, we focus on critical thinking and problem-solving. Our specialized curriculum allows students to explore subjects in depth, promoting teamwork and independent research."
            },
            {
              id: "high-school",
              tag: "Grades 9-12",
              title: "High School",
              img: "/assets/image/High.jpg",
              content: "Designed to prepare students for higher education and careers. We offer Humanities, Commerce, AI, Coding, Yoga, and Science, all aligned with the CBSE curriculum for holistic growth."
            },
            {
              id: "examination",
              tag: "Assessment",
              title: "Examination",
              img: "/assets/image/examination.jpg",
              content: "Our assessments ensure comprehensive evaluation through regular projects and practical exams. We provide a supportive environment that helps students manage stress and perform at their best."
            }
          ].map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0 focus-visible:outline-none">
              <div className="bg-white rounded-[2.5rem] p-6 lg:p-12 shadow-xl border border-gray-50 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                <div className="relative group flex justify-center order-2 lg:order-1">
                   <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#D6C9EF]/30 rounded-full blur-2xl -z-10" />
                   
                   <div className="relative rounded-[2rem] overflow-hidden shadow-2xl w-full max-w-[380px] lg:max-w-[450px]">
                     <Image
                       src={tab.img}
                       alt={tab.title}
                       width={450}
                       height={450}
                       className="object-cover aspect-square transition-transform duration-700 w-full"
                     />
                   </div>
                </div>

                <div className="space-y-5 lg:space-y-6 text-center lg:text-left order-1 lg:order-2">
                  <div className="space-y-2">
                    <span className="inline-block px-4 py-0.5 bg-[#E74040]/10 text-[#E74040] text-[10px] lg:text-sm font-black uppercase tracking-widest rounded-full">
                      {tab.tag}
                    </span>
                    <Heading2 title={tab.title} className="text-3xl lg:text-4xl" />
                  </div>
                  
                  <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-medium">
                    {tab.content}
                  </p>

                  <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-3">
                     <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E74040]" />
                        <span className="text-xs font-bold text-[#3B2565]">Holistic Growth</span>
                     </div>
                     <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3B2565]" />
                        <span className="text-xs font-bold text-[#3B2565]">Expert Faculty</span>
                     </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Academics;
