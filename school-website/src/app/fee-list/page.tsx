import React from "react";
import Heading from "@/components/heading";
import { poppins } from "@/utils/font";

const FeeListPage = () => {
    return (
        <main className={`min-h-screen py-20 px-5 lg:px-20 ${poppins.className}`}>
            <Heading title="Fee Structure" />
            <div className="mt-10 max-w-4xl mx-auto">
                <p className="text-center text-gray-600 mb-10">
                    Transparent and detailed fee structure for all classes.
                </p>
                <div className="overflow-hidden rounded-3xl border shadow-xl bg-white">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#3B2565] text-white">
                                <th className="p-4 lg:p-6 font-bold">Category</th>
                                <th className="p-4 lg:p-6 font-bold">Description</th>
                                <th className="p-4 lg:p-6 font-bold text-right">Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {[
                                { cat: "Registration Fee", desc: "One-time payment during admission", amt: "1,500" },
                                { cat: "Security Deposit", desc: "Refundable deposit", amt: "5,000" },
                                { cat: "Tuition Fee (Monthly)", desc: "Class 1 to 5", amt: "3,200" },
                                { cat: "Tuition Fee (Monthly)", desc: "Class 6 to 10", amt: "4,500" },
                                { cat: "Tuition Fee (Monthly)", desc: "Class 11 to 12", amt: "5,800" },
                                { cat: "Activity Fee (Yearly)", desc: "Includes sports and cultural events", amt: "2,500" },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 lg:p-6 font-semibold">{row.cat}</td>
                                    <td className="p-4 lg:p-6 text-gray-600">{row.desc}</td>
                                    <td className="p-4 lg:p-6 text-right font-bold text-[#E74040]">₹{row.amt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-8 text-sm text-gray-500 italic text-center">
                    * Note: Fee structure is subject to change. Please contact the office for the latest information.
                </p>
            </div>
        </main>
    );
};

export default FeeListPage;
