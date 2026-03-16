"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  ImageIcon, 
  Video, 
  Calendar, 
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  UserPlus,
  LayoutDashboard
} from "lucide-react";
import { cn } from "@/lib/utils";


const recentActivities = [
  { id: 1, action: "Updated homepage banner text", time: "2 hours ago", user: "Admin", status: "Completed" },
  { id: 2, action: "New Admission Enquiry – Rohan Singh", time: "4 hours ago", user: "System", status: "Pending" },
  { id: 3, action: "Added 15 images to Annual Day album", time: "Yesterday", user: "Editor", status: "Completed" },
  { id: 4, action: "Changed TC Status – #TC-2024-001", time: "2 days ago", user: "Admin", status: "Completed" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState([
    { name: "Gallery Images", value: "...", icon: ImageIcon, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Total Videos", value: "...", icon: Video, color: "text-purple-600", bg: "bg-purple-100" },
    { name: "Total News/Events", value: "...", icon: Calendar, color: "text-orange-600", bg: "bg-orange-100" },
    { name: "Total Enquiries", value: "...", icon: Users, color: "text-green-600", bg: "bg-green-100" },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard/stats");
        const { data } = await res.json();
        if (data) {
          setStats([
            { name: "Gallery Images", value: data.galleryImages.toString(), icon: ImageIcon, color: "text-blue-600", bg: "bg-blue-100" },
            { name: "Total Videos", value: data.totalVideos.toString(), icon: Video, color: "text-purple-600", bg: "bg-purple-100" },
            { name: "Total News/Events", value: data.eventsThisMonth.toString(), icon: Calendar, color: "text-orange-600", bg: "bg-orange-100" },
            { name: "Total Enquiries", value: data.pendingAdmissions.toString(), icon: Users, color: "text-green-600", bg: "bg-green-100" },
          ]);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-[#3B2565]">Welcome back, Admin 👋</h2>
        <p className="text-gray-500 mt-1 font-medium">Here&apos;s what&apos;s happening on your school website today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div key={item.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={cn("p-3 rounded-xl", item.bg)}>
                <item.icon className={cn("h-6 w-6", item.color)} />
              </div>
              <span className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg">
                <TrendingUp className="h-3 w-3" />
                +12%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.name}</p>
              <p className="text-3xl font-black text-gray-800 mt-1">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-500" />
              Recent Activity
            </h3>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              View All
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-[#3B2565]/10 h-10 w-10 rounded-full flex items-center justify-center text-[#3B2565] font-black text-sm shrink-0">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">{activity.time} · by {activity.user}</p>
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide shrink-0",
                  activity.status === "Completed" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                )}>
                  {activity.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#3B2565] rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <ActionButton icon={FileText} label="Post New Event" />
              <ActionButton icon={ImageIcon} label="Upload Gallery Photos" />
              <ActionButton icon={UserPlus} label="Process Admissions" />
              <ActionButton icon={CheckCircle2} label="Verify Transfer Certificate" />
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none">
            <LayoutDashboard size={200} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button className="flex items-center gap-3 w-full bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-all duration-200 text-left group">
      <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-sm font-bold">{label}</span>
    </button>
  );
}
