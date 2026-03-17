import AccountDetails from "@/components/academics/account-details";
import Sessions from "@/components/academics/sessions";
import TransferCertificate from "@/components/academics/transfer-certificate";
import Uniform from "@/components/academics/uniform";
import Banner from "@/components/banner";
import ToppersResult from "@/components/home/toppers-result";
import { server_query_function } from "@/lib/graphql";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const page = async () => {
  const query = `query MyQuery {
    haldwaniHomes(first: 1) {
      classXTopperHeading
      classXTopperDesc
      classXiiTopperHeading
      classXiiTopperDesc
      toppers {
        id
        class
        topperDetails {
          id
          name
          percentage
          subject
          topperImage {
            url
          }
        }
      }
    }
  }`;

  let toppersData = null;
  try {
    const response = (await server_query_function(query)) as any;
    const homeData = response?.haldwaniHomes?.[0];
    
    toppersData = {
      allToppers: homeData?.toppers || [],
      classXHeading: homeData?.classXTopperHeading,
      classXDesc: homeData?.classXTopperDesc,
      classXiiHeading: homeData?.classXiiTopperHeading,
      classXiiDesc: homeData?.classXiiTopperDesc
    };
  } catch (error) {
    console.error("❌ Academics Page Fetch Error:", error);
  }

  return (
    <>
      <Banner
        title="Academics"
        description="Beersheba - Haldwani"
        source="/assets/image/aboutImage.jpg"
      />
      <ToppersResult initialData={toppersData} />

      <Sessions />
      <Uniform />
      {/* <TransferCertificate /> */}
    </>
  );
};

export default page;
