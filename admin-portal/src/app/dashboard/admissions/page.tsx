"use client";

import React, { useState, useEffect } from "react";
import { UserPlus, Search, Phone, Mail, GraduationCap, MessageCircle, Clock, Trash2, Calendar, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AdmissionEnquiry } from "@/types/database";

export default function AdmissionsManagement() {
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admissions");
      const { data } = await res.json();
      setEnquiries(data as any || []);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setIsUpdating(id);
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus as any } : e));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this enquiry?")) return;
    try {
      const res = await fetch(`/api/admissions/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries(enquiries.filter(e => e.id !== id));
      }
    } catch (error) {
      console.error("Error deleting enquiry:", error);
    }
  };

  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = 
      e.student_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      e.phone.includes(searchTerm) ||
      e.parent_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "All" || e.status.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === "new").length,
    contacted: enquiries.filter(e => e.status === "contacted").length,
    pending: enquiries.filter(e => e.status === "pending").length,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3B2565]">Admission Enquiries</h2>
          <p className="text-gray-500 mt-1 font-medium italic">Manage prospective student applications and parent enquiries.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
           {["All", "New", "Contacted", "Pending"].map((tab) => (
              <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                    activeTab === tab ? "bg-[#3B2565] text-white shadow-lg" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                 )}
              >
                 {tab}
              </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <div className="lg:col-span-3 space-y-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between gap-4">
               <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search students or phone..." 
                    className="pl-10 h-10 border-gray-100 rounded-xl" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <Button onClick={fetchEnquiries} variant="outline" className="flex gap-2 text-gray-400 border-gray-100 px-6">
                  <Calendar size={18} />
                   Refresh List
               </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {isLoading ? (
                  <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100">
                    <Loader2 className="h-8 w-8 text-[#3B2565] animate-spin mb-4" />
                    <p className="text-gray-500 font-medium">Loading enquiries...</p>
                  </div>
               ) : filteredEnquiries.length === 0 ? (
                  <div className="text-center p-12 bg-white rounded-2xl border border-gray-100 italic text-gray-400">
                    No enquiries found.
                  </div>
               ) : filteredEnquiries.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#3B2565]/20 transition-all group overflow-hidden relative">
                     <div className={cn(
                        "absolute top-0 left-0 w-1.5 h-full",
                        item.status === "new" ? "bg-blue-500" : item.status === "contacted" ? "bg-green-500" : "bg-orange-500"
                     )} />
                     
                     <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex gap-5">
                           <div className="bg-gray-50 h-14 w-14 rounded-full flex items-center justify-center border border-gray-100 text-[#3B2565] font-black text-xl shrink-0 group-hover:bg-[#3B2565] group-hover:text-white transition-colors">
                              {item.student_name.charAt(0)}
                           </div>
                           <div className="space-y-1">
                              <h3 className="font-black text-xl text-[#3B2565]">{item.student_name}</h3>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 font-bold">
                                 <p className="flex items-center gap-1"><GraduationCap size={14} className="text-[#3B2565]" /> Seeking Class {item.class_seeking}</p>
                                 <p className="flex items-center gap-1"><MessageCircle size={14} className="text-[#3B2565]" /> Parent: {item.parent_name}</p>
                                 <p className="flex items-center gap-1"><Clock size={14} className="text-[#3B2565]" /> Received: {new Date(item.created_at).toLocaleDateString()}</p>
                              </div>
                              {item.message && (
                                <p className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded-lg italic">"{item.message}"</p>
                              )}
                           </div>
                        </div>

                        <div className="flex flex-col md:items-end justify-between gap-4">
                           <div className="flex items-center gap-2">
                              {isUpdating === item.id && <Loader2 size={12} className="animate-spin text-[#3B2565]" />}
                              <select 
                                value={item.status}
                                onChange={(e) => updateStatus(item.id, e.target.value)}
                                className={cn(
                                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-none cursor-pointer outline-none",
                                  item.status === "new" ? "bg-blue-100 text-blue-700" : 
                                  item.status === "contacted" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                                )}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                              </select>
                           </div>
                           <div className="flex gap-2">
                              <a href={`tel:${item.phone}`} className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors">
                                 <Phone size={14} /> {item.phone}
                              </a>
                              {item.email && (
                                <a href={`mailto:${item.email}`} className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-purple-100 transition-colors">
                                   <Mail size={14} /> Email
                                </a>
                              )}
                              <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-300 hover:text-red-500 rounded-xl transition-colors"><Trash2 size={18} /></button>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="space-y-6">
            <Card className="shadow-sm border-none bg-gradient-to-br from-[#3B2565] to-indigo-900 text-white p-6 relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                     <UserPlus className="h-5 w-5 opacity-50" />
                     Admissions Overview
                  </h3>
                  <div className="space-y-4">
                     <OverviewStat label="Total Enquiries" count={stats.total.toString()} />
                     <OverviewStat label="New" count={stats.new.toString()} />
                     <OverviewStat label="Contacted" count={stats.contacted.toString()} />
                     <OverviewStat label="Pending" count={stats.pending.toString()} />
                  </div>
                  <Button className="w-full mt-6 bg-white text-[#3B2565] hover:bg-white/90 font-black text-xs uppercase h-11">
                     Generate Season Report
                  </Button>
               </div>
               <div className="absolute -bottom-10 -right-10 opacity-10">
                  <UserPlus size={150} />
               </div>
            </Card>

            <Card className="shadow-sm border-gray-100 overflow-hidden">
               <CardHeader className="bg-gray-50 border-b border-gray-100 px-6 py-4">
                  <CardTitle className="text-sm font-black text-[#3B2565] uppercase tracking-widest">Recent Activity</CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-gray-50">
                     {enquiries.slice(0, 3).map(e => (
                       <LogItem key={e.id} text={`New enquiry from ${e.student_name}`} time={new Date(e.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} color="bg-blue-500" />
                     ))}
                     {enquiries.length === 0 && <p className="p-4 text-xs text-gray-400 italic">No recent activity</p>}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}

function OverviewStat({ label, count }: { label: string, count: string }) {
   return (
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
         <span className="text-xs font-bold text-white/60 uppercase tracking-widest">{label}</span>
         <span className="text-xl font-black">{count}</span>
      </div>
   )
}

function LogItem({ text, time, color }: { text: string, time: string, color: string }) {
   return (
      <div className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
         <div className={cn("h-2 w-2 rounded-full", color)} />
         <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-700 truncate">{text}</p>
            <p className="text-[10px] text-gray-400 font-medium">{time}</p>
         </div>
      </div>
   )
}


