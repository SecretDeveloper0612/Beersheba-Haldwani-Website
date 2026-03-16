import { BookMarked } from "lucide-react";
import React from "react";

const IconCard = () => {
  return (
    <div className="grid grid-cols-1 py-10 px-5 md:px-10 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
      <div className="bg-white shadow-lg flex-col p-5 rounded-xl flex justify-center items-center">
        <BookMarked size={30} className="text-[#3B2565]" />
        <p className="text-lg font-semibold mt-3 md:mt-5">{5000}</p>
        <p>Alumni</p>
      </div>
      <div className="bg-[#3B2565] shadow-lg flex-col p-5 rounded-xl flex justify-center items-center">
        <BookMarked size={60} className="text-white" />
        <p className="text-lg text-white font-semibold mt-3 md:mt-5">{47}+</p>
        <p className="text-white">Years of Excellence</p>
      </div>
      <div className="bg-white shadow-lg flex-col p-5 rounded-xl flex justify-center items-center">
        <BookMarked size={60} className="text-[#3B2565]" />
        <p className="text-lg font-semibold mt-3 md:mt-5">{3000}+</p>
        <p>Books</p>
      </div>
      <div className="bg-white shadow-lg flex-col p-5 rounded-xl flex justify-center items-center">
        <BookMarked size={25} className="text-[#3B2565]" />
        <p className="text-lg font-semibold mt-3 md:mt-5">{70}+</p>
        <p>Computers</p>
      </div>
    </div>
  );
};

export default IconCard;
