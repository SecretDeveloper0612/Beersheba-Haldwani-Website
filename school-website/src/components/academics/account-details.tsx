import React from "react";
import Heading3 from "../heading3";

const AccountDetails = () => {
  return (
    <section className="container p-5 lg:p-10">
      <Heading3 title="Account Details" />
      <div className="lg:p-10">
        <div className="overflow-x-auto max-w-4xl mx-auto">
          <table className="w-full my-10 text-[#3B2565] border-collapse min-w-[600px]">
            <tbody>
              <tr>
                <td className="border-2 text-xl font-semibold border-[#3B2565] py-3 px-5">
                  Bank Account Number
                </td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  50100078054420
                </td>
              </tr>
              <tr>
                <td className="border-2 text-xl font-semibold border-[#3B2565] py-3 px-5">
                  Bank Name
                </td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  HDFC BANK
                </td>
              </tr>
              <tr>
                <td className="border-2 text-xl font-semibold border-[#3B2565] py-3 px-5">
                  Bank Account Type
                </td>
                <td className="border-2 border-[#3B2565] py-3 px-5">CURRENT</td>
              </tr>
              <tr>
                <td className="border-2 text-xl font-semibold border-[#3B2565] py-3 px-5">
                  Beneficiary Name
                </td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  BEERSHEBA SENIOR SEC SCHOOL
                </td>
              </tr>
              <tr>
                <td className="border-2 text-xl font-semibold border-[#3B2565] py-3 px-5">
                  IFSC Code
                </td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  HDFC0000458
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AccountDetails;
