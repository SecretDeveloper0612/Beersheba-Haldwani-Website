"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Home, 
  Info, 
  GraduationCap, 
  Building2, 
  Image as ImageIcon, 
  Video, 
  Newspaper, 
  UserPlus, 
  FileCheck, 
  MessageSquare, 
  Search, 
  Settings,
  Library,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Homepage", icon: Home, href: "/dashboard/homepage" },
  { name: "About Page", icon: Info, href: "/dashboard/about" },
  { name: "Academics", icon: GraduationCap, href: "/dashboard/academics" },
  { name: "Facilities", icon: Building2, href: "/dashboard/facilities" },
  { name: "Photo Gallery", icon: ImageIcon, href: "/dashboard/gallery" },
  { name: "Video Gallery", icon: Video, href: "/dashboard/video-gallery" },
  { name: "News & Events", icon: Newspaper, href: "/dashboard/news" },
  { name: "Admissions", icon: UserPlus, href: "/dashboard/admissions" },
  { name: "TC Management", icon: FileCheck, href: "/dashboard/tc" },
  { name: "Enquiries", icon: MessageSquare, href: "/dashboard/enquiries" },
  { name: "Media Library", icon: Library, href: "/dashboard/media" },
  { name: "SEO Settings", icon: Search, href: "/dashboard/seo" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#3B2565] text-white min-h-screen flex flex-col shadow-xl flex-shrink-0">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-tight">Beersheba Admin</h1>
        <p className="text-xs text-white/60 mt-1 uppercase tracking-widest">Management System</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-white text-[#3B2565] shadow-lg font-bold" 
                  : "hover:bg-white/10 text-white/80 hover:text-white"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-[#3B2565]" : "text-white/60 group-hover:text-white")} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors">
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
