import React from "react";
import Heading3 from "../heading3";
import IconCard from "./icon-card";
import { Eye, Goal } from "lucide-react";
import { poppins } from "@/utils/font";
import { server_query_function } from "@/lib/graphql";

const OurDesc = async () => {
  let homeData: any = null;
  
  try {
    const query = `
      query GetMissionVision {
        haldwaniHomes(first: 1) {
          missionText
          visionText
        }
      }
    `;
    const response = await server_query_function(query) as any;
    homeData = response?.haldwaniHomes?.[0];
  } catch (error) {
    console.error("Error fetching mission/vision data:", error);
  }

  const missionText = homeData?.missionText || "Founded on July 4, 1977, in the heart of Haldwani, Beersheba School started with an initial enrollment of 60 children and was established by the late Shri. and Smt. N.N.D. Bhatt. As a co-educational English Medium school, our mission is to provide a nurturing environment that fosters holistic development and prepares students for future challenges and successes.";
  const visionText = homeData?.visionText || "At Beersheba School, we envision a dynamic learning environment where innovation and excellence converge. Founded on July 4, 1977, in the heart of Haldwani by the late Shri. and Smt. N.N.D. Bhatt, our vision is to empower students with the skills, knowledge, and values necessary to thrive in a global society.";

  return (
    <section className="container mx-auto py-10 px-5 md:px-20">
      <Heading3 title="Milestones of Excellence" />
      <p className=" text-gray-600 mt-3 md:mt-5">
        At Beersheba School, we take pride in our rich legacy of excellence,
        supported by a vibrant community of alumni, advanced facilities, and a
        comprehensive library. We are dedicated to providing quality education
        and fostering holistic development, preparing students to excel in a
        dynamic world.
      </p>
      <IconCard />
      <p className=" text-gray-600 mt-3 md:mt-5">
        Beersheba School, located in Haldwani, was established on April 1, 1994,
        in the heart of the city with an initial enrollment of only 60 children.
        This co-educational English Medium school was founded by the late Shri.
        and Smt. N.N.D. Bhatt. The school&apos;s origin, existence, and
        development can be attributed to the unwavering efforts of the late Mr.
        N.N.D. Bhatt.
      </p>

      <div className="max-w-4xl mx-auto ">
        <table className="w-full my-10 text-[#3B2565] border-collapse">
          <tbody>
            <tr>
              <td className="border-2 border-[#3B2565] py-3 px-5">
                Medium of Instruction :
              </td>
              <td className="border-2 border-[#3B2565] py-3 px-5">English</td>
            </tr>
            <tr>
              <td className="border-2 border-[#3B2565] py-3 px-5">
                Board Affiliated to:
              </td>
              <td className="border-2 border-[#3B2565] py-3 px-5">C.B.S.E.</td>
            </tr>
            <tr>
              <td className="border-2 border-[#3B2565] py-3 px-5">
                Affiliation No:
              </td>
              <td className="border-2 border-[#3B2565] py-3 px-5">3530013</td>
            </tr>
            <tr>
              <td className="border-2 border-[#3B2565] py-3 px-5">
                Affiliation Status:
              </td>
              <td className="border-2 border-[#3B2565] py-3 px-5">
                01.04.2024 to 31.03.2029
              </td>
            </tr>
            <tr>
              <td className="border-2 border-[#3B2565] py-3 px-5">
                Norms followed for Fixing Fees:
              </td>
              <td className="border-2 border-[#3B2565] py-3 px-5">
                As per State Government
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        <div className="">
          <div className="flex gap-5 items-center">
            <Goal size={60} className="text-[#DB2F2F]" />
            <h5
              className={`${poppins.className} text-[#3B2565] text-xl font-extrabold`}
            >
              Our Mission
            </h5>
          </div>
          <div 
            className="py-3 text-gray-600"
            dangerouslySetInnerHTML={{ __html: missionText }}
          />
        </div>
        <div className="">
          <div className="flex gap-5 items-center">
            <Eye size={60} className="text-[#DB2F2F]" />
            <h5
              className={`${poppins.className} text-[#3B2565] text-xl font-extrabold`}
            >
              Our Vision
            </h5>
          </div>
          <div 
            className="py-3 text-gray-600"
            dangerouslySetInnerHTML={{ __html: visionText }}
          />
        </div>
      </div>
    </section>
  );
};

export default OurDesc;
