"use client";

import React from "react";
import { Bell, Search, UserCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-full w-96 max-w-full">
        <Search className="h-4 w-4 text-gray-500" />
        <input 
          type="text" 
          placeholder="Search for something..." 
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-600 hover:text-[#3B2565] transition-colors">
          <Bell className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white font-bold">
            3
          </span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800">Administrator</p>
            <p className="text-xs text-gray-500 font-medium">Super Admin</p>
          </div>
          <UserCircle className="h-9 w-9 text-gray-300" />
        </div>
      </div>
    </header>
  );
};

export default Header;
