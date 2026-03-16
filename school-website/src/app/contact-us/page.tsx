// @ts-nocheck
import Banner from "@/components/banner";
import ContactUsCard from "@/components/contact-us/contact-us-card";
import React from "react";

const page = () => {
  return (
    <>
      <Banner
        source="/assets/image/aboutImage.jpg"
        title="Contact Us"
        description="Beersheba - Haldwani"
      />
      <ContactUsCard />
      <div
        style={{
          width: "100%",
        }}
      >
        <iframe
          width="100%"
          height="400"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=6GMJ+RM8,%20Civil%20Lines,%20National%20Highway%2087,%20Haldwani,%20Uttarakhand%20263139+(School%20Map)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/">gps vehicle tracker</a>
        </iframe>
      </div>
    </>
  );
};

export default page;
