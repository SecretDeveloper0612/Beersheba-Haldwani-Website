import About from "@/components/about/about";
import OurDesc from "@/components/about/our-desc";
import AccountDetails from "@/components/academics/account-details";
import AdmissionEnquiry from "@/components/admission-enquiry";
import Banner from "@/components/banner";
import Branches from "@/components/branches";
import Video from "@/components/video";

export default function Home() {
  return (
    <main className="">
      <Banner
        source="/assets/image/WhatsApp Image 2024-08-28 at 9.46.33 AM.jpeg"
        title="About School"
        description="Beersheba - Haldwani"
      />
      <About />
      <OurDesc />
      <Branches />
      <AccountDetails />
      <Video source="/assets/image/Beersheba Senior Secondary School, Haldwani-(1080p) (1).mp4" />
      <AdmissionEnquiry />
    </main>
  );
}
