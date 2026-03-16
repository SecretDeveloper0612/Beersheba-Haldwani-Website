import React from "react";
import Heading3 from "../heading3";
import Image from "next/image";

const Uniform = () => {
  return (
    <section className="container p-5 lg:p-10">
      <Heading3 title="School Uniform" />
      <div className="lg:p-10">
        <p className="text-gray-600">
          Students must come to the school in proper school uniform on all
          occasions. All students are required to wear school uniform as per the
          specifications given. Students must come to the school in proper
          school uniform on all occasions.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full lg:max-w-4xl mx-auto my-10 text-[#3B2565] border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="border-2 border-[#3B2565] py-3 px-5"></th>
                <th className="border-2 border-[#3B2565] py-3 px-5 bg-gray-300">
                  Summer Uniform
                </th>
                <th className="border-2 border-[#3B2565] py-3 px-5 bg-gray-300">
                  Winter Uniform
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  <div className="flex justify-center items-center rounded-full p-5 bg-gray-300">
                    <Image
                      src={"/assets/image/man (1).svg"}
                      alt="womenIcon"
                      width={150}
                      height={150}
                    />
                  </div>
                </td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  Classes I to XII - White Shirt (Short sleeves), Blue Black
                  Pants and shorts for boys below 5&apos;height (upto Class
                  VIII), Plain Black Shoes and Blue Black Socks with School
                  colour stripes, School tie and belt, Blue Dastar for Sikh
                  Boys.
                </td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  Classes I to XII - White Shirt (Short sleeves), Blue Black
                  Pants and shorts for boys below 5&apos;height (upto Class
                  VIII), Plain Black Shoes and Blue Black Socks with School
                  colour stripes, School tie and belt, Blue Dastar for Sikh
                  Boys.
                </td>
              </tr>
              <tr>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  <div className="flex justify-center items-center rounded-full p-5 bg-gray-300">
                    <Image
                      src={"/assets/image/man (2).svg"}
                      alt="womenIcon"
                      width={150}
                      height={150}
                    />
                  </div>
                </td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  (Class I to X) - Blue Black divided skirt and white shirt.
                  School tie and belt, Plain Black Shoes and Blue Black
                  Stockings. Blue ribbon/Blue hair band 1 inch wide. (Class XI
                  and XII) Blue black salwar, light blue striped kurta.
                </td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  (Class I to X) - Blue Black divided skirt and white shirt.
                  School tie and belt, Plain Black Shoes and Blue Black
                  Stockings. Blue ribbon/Blue hair band 1 inch wide. (Class XI
                  and XII) Blue black salwar, light blue striped kurta.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Uniform;
