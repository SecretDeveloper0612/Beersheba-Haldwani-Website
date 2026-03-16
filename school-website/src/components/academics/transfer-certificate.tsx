import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const TransferCertificate = () => {
  return (
    <section className="py-10 px-5">
      <div className="p-10 bg-gray-300 max-w-4xl flex flex-col lg:flex-row mx-auto rounded-lg gap-10">
        <p className="text-xl font-semibold ">Enter Serial No.</p>
        <div className="flex w-80 lg:w-96 flex-col lg:flex-row gap-5">
          <Input placeholder="Enter Serial Number" className="W-full" />
          <Button>Search</Button>
        </div>
      </div>
    </section>
  );
};

export default TransferCertificate;
