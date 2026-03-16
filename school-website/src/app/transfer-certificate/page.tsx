import React from "react";
import type { Metadata } from "next";
import TCHero from "@/components/transfer-certificate/hero";
import TCSearchForm from "@/components/transfer-certificate/search-form";

export const metadata: Metadata = {
  title: "Transfer Certificate Verification | Beersheba School Haldwani",
  description:
    "Verify the authenticity of student Transfer Certificates (TC) issued by Beersheba Sr Sec School Haldwani. Official online verification portal for institutions and parents.",
  openGraph: {
    title: "Transfer Certificate Verification | Beersheba School Haldwani",
    description: "Official online verification portal for student Transfer Certificates issued by Beersheba School Haldwani.",
    images: ["/assets/image/aboutImage.jpg"],
    type: "website",
  },
};

const TransferCertificatePage = () => {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <TCHero />
      
      <div className="container mx-auto">
        <TCSearchForm />
        
        {/* Informational Note */}
        <div className="max-w-4xl mx-auto mt-16 px-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-xl">
            <h3 className="text-blue-800 font-bold mb-2">Important Information</h3>
            <p className="text-blue-700 leading-relaxed">
              This online verification system is provided by Beersheba School Haldwani to assist other educational institutions, 
              employers, and relevant authorities in confirming the authenticity of student records. 
              The electronic verification record serves as a confirmation of the details mentioned on the physical Transfer Certificate.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TransferCertificatePage;
