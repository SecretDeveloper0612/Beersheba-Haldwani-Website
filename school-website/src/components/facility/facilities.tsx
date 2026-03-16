import Image from "next/image";
import React from "react";
import Heading2 from "../heading2";

const facilitiesData = [
  {
    title: "Library",
    description:
      " It's pleasure to inform you that our library is well-stocked with books catering to varied tastes and age groups. Additionally, the subscription to newspapers and journals enhances students' knowledge, and the regular purchase of new books keeps the collection current. A diverse collection, including digital resources, would further enrich the learning experience. Comfortable reading spaces, knowledgeable library staff, and collaboration with teachers are crucial elements for fostering a positive environment. Implementing information literacy programs, organizing library events, and considering extended hours are also commendable practices that contribute to a thriving and dynamic library setting. Overall, your commitment to maintaining an engaging library bodes well for promoting a love of reading and supporting academic pursuits within the school community.",
    images: [
      "/assets/image/library-1.jpg",
      "/assets/image/library-2.jpg",
      "/assets/image/library-3.jpg",
    ],
  },
  {
    title: "Laboratory",
    description:
      "The school boasts well-equipped science laboratories, integral to the curriculum's scientific components. These laboratories are extensively utilized to support hands-on learning experiences, employing practical experiments whenever feasible to enrich students' understanding of scientific concepts.",
    images: [
      "/assets/image/laboratry-1.jpg",
      "/assets/image/laboratry-2.jpg",
      "/assets/image/laboratry-3.jpg",
    ],
  },
  {
    title: "Computer Lab",
    description:
      "The school features a spacious and well-equipped computer lab, complemented by a dedicated computer lecture room. Students benefit from ample hands-on experience with computers, recognizing the contemporary demand for technological proficiency. To meet this demand, the lab is equipped with the latest hardware and software. Furthermore, the program's syllabus is regularly updated to align with current technological advancements, ensuring students are well-prepared for the evolving landscape of technology.",
    images: [
      "/assets/image/computer-1.jpg",
      "/assets/image/computer-2.jpg",
      "/assets/image/computer-3.jpg",
    ],
  },
  {
    title: "School Bus Facility",
    description:
      "The bus routes and stops will be decided keeping in mind convenience to as many as possible.The change in bus route can be done on request of the parents, provided it does not cause any inconvenience to any body else.The student should arrive at the stop 5 minutes prior to the arrival time of the bus.Buses will not wait for the late comers.The safety of the student till he/she boards the bus is totally parent's responsibility.",
    images: [
      "/assets/image/school-bus-1.jpg",
      "/assets/image/school-bus-2.jpg",
      "/assets/image/school-bus-3.jpg",
    ],
  },
  {
    title: "Music Room",
    description:
      "Acoustic Considerations: Proper acoustic treatment to minimize sound reflections and create an environment that enhances the quality of music production.Instruments: A variety of musical instruments based on the needs of the music program, such as pianos, guitars, drums, string instruments, and wind instruments.Music Stands: Adjustable and sturdy music stands for holding sheet music during practice and performances.Piano/Keyboard: An acoustic piano or electronic keyboard for accompaniment and practice.",
    images: [
      "/assets/image/music-1.jpg",
      "/assets/image/music-2.jpg",
      "/assets/image/music-3.jpg",
    ],
  },
  {
    title: "Art Room",
    description:
      "At Beersheba School, our Art Rooms are dynamic centers where imagination knows no bounds. We provide anurturing environment across all four branches for students to explore diverse mediums, develop technical skills,and discover their unique artistic voice. We believe that art is essential for developing critical thinking, observation skills, and emotional intelligence.",
    images: [
      "/assets/image/art-1.jpg",
      "/assets/image/art-2.jpg",
      "/assets/image/art-3.jpg",
    ],
  },
];

const Facilities = () => {
  return (
    <section className="py-12 px-5 lg:px-16 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3B2565] relative inline-block">
            Our School Facilities
            <span className="block h-1 w-24 bg-[#DB2F2F] mx-auto mt-3"></span>
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore the modern facilities we offer to enhance the learning
            experience of our students
          </p>
        </div>

        {facilitiesData.map((facility, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-16 transition-transform hover:scale-[1.01]"
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${
                index % 2 === 0 ? "" : "lg:flex-row-reverse"
              }`}
            >
              <div className={`${index % 2 === 0 ? "order-1" : "lg:order-2"}`}>
                <div className="relative h-[350px] overflow-hidden">
                  <Image
                    src={facility.images[0]}
                    alt={facility.title}
                    width={700}
                    height={400}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="overflow-hidden rounded-md">
                    <Image
                      src={facility.images[1]}
                      alt={`${facility.title} view 2`}
                      width={300}
                      height={300}
                      className="w-full h-[180px] object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="overflow-hidden rounded-md">
                    <Image
                      src={facility.images[2]}
                      alt={`${facility.title} view 3`}
                      width={300}
                      height={300}
                      className="w-full h-[180px] object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              <div
                className={`flex justify-center flex-col p-6 lg:p-8 ${
                  index % 2 === 0 ? "order-2" : "lg:order-1"
                }`}
              >
                <div className="border-l-4 border-[#DB2F2F] pl-4 mb-4">
                  <Heading2 title={facility.title} />
                </div>
                <p className="text-sm md:text-base leading-relaxed text-gray-600">
                  {facility.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Facilities;
