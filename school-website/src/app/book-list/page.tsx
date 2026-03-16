import React from "react";
import Heading from "@/components/heading";
import { poppins } from "@/utils/font";

const BookListPage = () => {
    // This is a placeholder. In a real app, this might fetch from a CMS or database.
    const books = [
        { class: "Class 1", link: "#" },
        { class: "Class 2", link: "#" },
        { class: "Class 3", link: "#" },
        { class: "Class 4", link: "#" },
        { class: "Class 5", link: "#" },
        { class: "Class 6", link: "#" },
        { class: "Class 7", link: "#" },
        { class: "Class 8", link: "#" },
        { class: "Class 9", link: "#" },
        { class: "Class 10", link: "#" },
        { class: "Class 11", link: "#" },
        { class: "Class 12", link: "#" },
    ];

    return (
        <main className={`min-h-screen py-20 px-5 lg:px-20 ${poppins.className}`}>
            <Heading title="Book List" />
            <div className="mt-10 max-w-4xl mx-auto">
                <p className="text-center text-gray-600 mb-10">
                    Find the recommended book list for the academic session 2024-25.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((item, index) => (
                        <div key={index} className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white flex justify-between items-center group">
                            <span className="font-bold text-lg text-[#3B2565]">{item.class}</span>
                            <button className="text-white bg-[#3B2565] px-4 py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                View List
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default BookListPage;
