import "@/lib/node-polyfill";
import NodeFix from "@/components/node-fix";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { latto, poppins } from "@/utils/font";
import TopHeader from "@/components/top-header";
import Marque from "@/components/marque";
import Footer from "@/components/footer";
import Link from "next/link";
import GoogleTM from "@/components/google-tm";
import StickyButtons from "@/components/sticky-buttons";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Beersheba Sr Sec School Haldwani - Academic Excellence",
  description:
    "Beersheba Sr Sec School in Haldwani offers top-notch education, modern facilities, and a focus on holistic development. Enroll now for a brighter future!",
  keywords:
    "School , private schools near me ,montessori ,schools near me , boarding school , classroom google , private school , private school , educate , new education policy , schooling , teacher and student , secondary, 9th class , cbse official website , middle , my favourite teacher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${latto.className} bg-white overflow-x-hidden`} suppressHydrationWarning>
        <NodeFix />
        <TopHeader /> 
        <Header />
        <Marque />
        {children}
        <Footer />
        <div className="p-5">
          <p className={`${poppins.className} text-center font-medium`}>
            @Copyright 2023 All Rights Reserved
          </p>
          <p className={`${poppins.className} text-center font-medium`}>
            <Link href={"https://preettech.com/"}>Developed by Preet Tech</Link>
          </p>
        </div>
        <GoogleTM />
        <StickyButtons />
      </body>
    </html>
  );
}
