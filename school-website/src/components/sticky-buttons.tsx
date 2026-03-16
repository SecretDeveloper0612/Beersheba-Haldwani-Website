"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BookText, CircleDollarSign, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { poppins } from "@/utils/font";

const StickyButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    {
      label: "Book List",
      href: "/book-list",
      icon: <BookText className="w-5 h-5" />,
      color: "bg-[#3B2565]",
      textColor: "text-white",
    },
    {
      label: "Fee List",
      href: "/fee-list",
      icon: <CircleDollarSign className="w-5 h-5" />,
      color: "bg-[#F8EF2E]",
      textColor: "text-primary",
    },
  ];

  return (
    <div
      className={cn(
        poppins.className,
        "fixed right-6 bottom-10 z-[999] flex flex-col items-end gap-3"
      )}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Action Items */}
      <div
        className={cn(
          "flex flex-col gap-3 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] origin-bottom-right",
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-0 pointer-events-none"
        )}
      >
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-6 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-x-3 hover:shadow-2xl group/item relative overflow-hidden backdrop-blur-sm",
              item.color,
              item.textColor
            )}
            style={{
              transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
            }}
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
            
            <span className="font-exrabold text-sm tracking-widest whitespace-nowrap uppercase">
              {item.label}
            </span>
            <div className="p-2 bg-white/20 rounded-xl group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300 shadow-inner">
              {item.icon}
            </div>
          </Link>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        className={cn(
          "w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 relative group/main overflow-hidden backdrop-blur-md border border-white/20",
          isOpen ? "bg-red-500 rotate-180" : "bg-gradient-to-br from-[#3B2565] to-[#2a1a4a]"
        )}
        aria-label="Quick Access Menu"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover/main:opacity-100 transition-opacity" />
        
        <div className="relative w-8 h-8 flex items-center justify-center">
            <Plus
                className={cn(
                    "w-8 h-8 text-white transition-all duration-500 absolute",
                    isOpen ? "rotate-45 opacity-0 scale-0" : "rotate-0 opacity-100 scale-100"
                )}
            />
            <X
                className={cn(
                    "w-8 h-8 text-white transition-all duration-500 absolute",
                    isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-45 opacity-0 scale-0"
                )}
            />
        </div>

        {!isOpen && (
          <div className="absolute inset-0 rounded-3xl bg-[#3B2565] animate-ping opacity-20 -z-10" />
        )}
      </button>
    </div>
  );
};

export default StickyButtons;
