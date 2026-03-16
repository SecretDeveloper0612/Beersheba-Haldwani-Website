"use client";
import { cn } from "@/lib/utils";
import React from "react";
// @ts-expect-error
const Pagination = ({ currentIndex, goToSlide }) => {
  return (
    <div className="flex justify-center  mt-2 lg:mt-4">
      <div className="w-full relative h-14 gap-1 lg:gap-2 rounded-2xl flex justify-between items-center">
        <div
          className={cn(
            "bg-[#DE4848] w-full h-full flex justify-center items-center cursor-pointer  transition-all duration-200",
            0 === currentIndex && "bg-[#3B2565]"
          )}
          onClick={() => goToSlide(0)}
        >
          <p className="text-center font-semibold text-white text-sm lg:text-lg ">
            You Learn | We Educate
          </p>
        </div>
        <div
          className={cn(
            "bg-[#DE4848] w-full h-full flex justify-center items-center cursor-pointer  transition-all duration-200",
            1 === currentIndex && "bg-[#3B2565]"
          )}
          onClick={() => goToSlide(1)}
        >
          <p className="text-center font-semibold text-white text-sm lg:text-lg ">
            You Evolve | We Adapt
          </p>
        </div>
        <div
          className={cn(
            "bg-[#DE4848] w-full h-full flex justify-center items-center cursor-pointer  transition-all duration-200",
            2 === currentIndex && "bg-[#3B2565]"
          )}
          onClick={() => goToSlide(2)}
        >
          <p className="text-center font-semibold text-white text-sm lg:text-lg  ">
            You Grow | We Build
          </p>
        </div>

        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            borderBottom: "30px solid #ffffff",
          }}
          className={cn(
            "absolute -top-8 lg:-top-10 z-50",
            currentIndex === 0 && "left-[10%]  lg:left-[15%]",
            currentIndex === 1 && "left-[49.3%]",
            currentIndex === 2 && "left-[80%] lg:left-[82.5%]"
          )}
        ></div>
      </div>
    </div>
  );
};

export default Pagination;
