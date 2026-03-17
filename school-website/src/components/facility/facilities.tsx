import Image from "next/image";
import React from "react";
import Heading2 from "../heading2";
import { server_query_function } from "@/lib/graphql";

const Facilities = async () => {
  let facilitiesData = [];
  
  try {
    const query = `
      query GetFacilities {
        facilities(first: 20) {
          id
          title
          description
          image {
            url
          }
        }
      }
    `;
    const response = await server_query_function(query) as any;
    facilitiesData = response?.facilities || [];
  } catch (error) {
    console.error("Error fetching facilities:", error);
  }

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

        {facilitiesData.map((facility: any, index: number) => (
          <div
            key={facility.id || index}
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
                    src={facility.image?.url || "/assets/image/placeholder.jpg"}
                    alt={facility.title}
                    width={700}
                    height={400}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
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

        {facilitiesData.length === 0 && (
          <p className="text-center text-gray-500 italic">No facilities information available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default Facilities;
