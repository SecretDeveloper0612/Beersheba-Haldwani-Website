import AccountDetails from "@/components/academics/account-details";
import Sessions from "@/components/academics/sessions";
import TransferCertificate from "@/components/academics/transfer-certificate";
import Uniform from "@/components/academics/uniform";
import Banner from "@/components/banner";
import ToppersResult from "@/components/home/toppers-result";
import React from "react";

const page = () => {
  return (
    <>
      <Banner
        title="Academics"
        description="Beersheba - Haldwani"
        source="/assets/image/aboutImage.jpg"
      />
      <ToppersResult />

      <Sessions />
      <Uniform />
      {/* <TransferCertificate /> */}
    </>
  );
};

export default page;
