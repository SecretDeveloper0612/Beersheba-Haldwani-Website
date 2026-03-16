import { poppins } from "@/utils/font";
import React from "react";

type Props = {
  title: string;
};

const Heading = ({ title }: Props) => {
  return (
    <h1
      className={`${poppins.className} font-bold text-4xl md:text-6xl tracking-normal text-balance`}
    >
      {title}
    </h1>
  );
};

export default Heading;
