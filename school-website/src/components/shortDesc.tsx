import { poppins } from "@/utils/font";
import React from "react";

type ShortDescProps = {
  description: string;
};

const ShortDesc = ({ description }: ShortDescProps) => {
  return (
    <p
      className={`${poppins.className} pt-3 font-medium text-left text-lg md:text-xl text-yellow-400`}
    >
      {" "}
      {description}
    </p>
  );
};

export default ShortDesc;
