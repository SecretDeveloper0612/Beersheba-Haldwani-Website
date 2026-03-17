import React from "react";
import Heading3 from "../heading3";
import Image from "next/image";

const Why = () => {
  const features = [
    {
      title: "Best Teachers",
      desc: "Highly qualified educators dedicated to nurturing young minds with passion and expertise.",
      icon: "/assets/image/teacher-pointing-at-blackboard-svgrepo-com 1.png",
      bgColor: "bg-[#D6C9EF]/40",
      textColor: "text-[#3B2565]"
    },
    {
      title: "Our Achievers",
      desc: "Celebrating a legacy of students who consistently excel in academics and co-curricular fields.",
      icon: "/assets/image/success-svgrepo-com (1) 1.png",
      bgColor: "bg-white",
      textColor: "text-[#3B2565]"
    },
    {
      title: "Safe Campus",
      desc: "A secure, supportive environment with 24/7 monitoring for your child's complete safety.",
      icon: "/assets/image/monitoring-svgrepo-com 1.png",
      bgColor: "bg-[#D6C9EF]/40",
      textColor: "text-[#3B2565]"
    },
    {
      title: "Modern Education",
      desc: "Advanced smart classes and digital resources preparing students for tomorrow's challenges.",
      icon: "/assets/image/computer-tv-svgrepo-com 1.png",
      bgColor: "bg-[#3B2565]",
      textColor: "text-white"
    },
    {
      title: "Academic Excellence",
      desc: "Rigorous CBSE curriculum focused on critical thinking and deep conceptual understanding.",
      icon: "/assets/image/student-reading-svgrepo-com 1.png",
      bgColor: "bg-white",
      textColor: "text-[#3B2565]"
    },
    {
      title: "Sports Facilities",
      desc: "State-of-the-art sports infrastructure promoting physical fitness and team spirit.",
      icon: "/assets/image/success-svgrepo-com (1) 1.png",
      bgColor: "bg-[#3B2565]",
      textColor: "text-white"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-12 lg:py-24">
      <div className="text-center mb-10 lg:mb-16">
        <Heading3 title="Why Beersheba School" />
        <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-sm lg:text-base font-medium">
          Chosen by thousands of parents for over 45 years, we provide more than just education — we build character.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`${feature.bgColor} ${feature.textColor} p-6 lg:p-8 rounded-[2rem] shadow-lg transition-all duration-300 group hover:-translate-y-2 border border-black/5 flex flex-col justify-between`}
          >
            <div className="flex justify-between items-start mb-4 lg:mb-6">
              <div className="space-y-2 lg:space-y-3">
                 <h4 className="text-lg lg:text-2xl font-black tracking-tight leading-tight">
                   {feature.title}
                 </h4>
                 <div className="h-1 w-10 lg:w-12 rounded-full bg-[#E74040]" />
              </div>
              <div className={`p-2.5 lg:p-3 rounded-2xl ${feature.textColor === 'text-white' ? 'bg-white/10' : 'bg-gray-50'} shrink-0`}>
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={32}
                  height={32}
                  className={`${feature.textColor === 'text-white' ? 'brightness-0 invert' : ''} lg:w-10 lg:h-10`}
                />
              </div>
            </div>
            <p className={`text-sm lg:text-base leading-relaxed font-medium ${feature.textColor === 'text-white' ? 'text-white/80' : 'text-gray-600'}`}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Why;
