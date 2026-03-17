import React from "react";
import { poppins } from "@/utils/font";
import Heading2 from "../heading2";
import Image from "next/image";
import { server_query_function } from "@/lib/graphql";

const About = async () => {
  let homeData: any = null;
  
  try {
    const query = `
      query GetAbout {
        haldwaniHomes(first: 1) {
          welcomeHeading
          welcomeDescription
        }
      }
    `;
    const response = await server_query_function(query) as any;
    homeData = response?.haldwaniHomes?.[0];
  } catch (error) {
    console.error("Error fetching about data:", error);
  }

  const heading = homeData?.welcomeHeading || "Beersheba School";
  const description = homeData?.welcomeDescription || `
    Established on July 4, 1977, in the heart of Haldwani, Beersheba
    School started with just 60 children under the visionary leadership of
    the late Shri. and Smt. N.N.D. Bhatt. Their dedication and inspiration
    have been instrumental in shaping the school's growth and
    commitment to educational excellence. Today Beersheba School stands
    as a premier co-educational English Medium institution, known for its
    nurturing environment and comprehensive curriculum.
  `;

  return (
    <section className=" container relative mx-auto grid grid-cols-1  lg:grid-cols-2 gap-4 py-10 px-5 md:px-10">
      <div className="md:px-10">
        <p
          className={`${poppins.className} text-2xl font-medium text-[#DB2F2F]`}
        >
          About
        </p>

        <Heading2 title={heading} />

        <div 
          className="text-gray-600 mt-5 space-y-4"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div
        className="relative h-[70vh] md:h-full
      "
      >
        <Image
          src={"/assets/image/beershiba-2.jpeg"}
          alt="About Image"
          width={400}
          height={400}
          className="rounded-lg absolute top-0 left-0 md:left-24 w-60 h-80 object-cover"
        />
        <Image
          src={"/assets/image/beershiba-6.jpeg"}
          alt="About Image"
          width={400}
          height={400}
          className="rounded-lg absolute bottom-0 right-0 md:right-24 w-60 h-80 object-cover"
        />
      </div>
    </section>
  );
};

export default About;
