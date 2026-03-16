"use client";

import React, { useState, useEffect } from "react";
import { Search, Mail, MessageSquare, CheckCircle, Archive, Trash2, Reply, Star, StarOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ContactEnquiry } from "@/types/database";
import { cn } from "@/lib/utils";

export default function EnquiriesManagement() {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<ContactEnquiry | null>(null);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEnquiries();
  }, [filter]);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/enquiries?status=${filter}`);
      const { data } = await res.json();
      setEnquiries(data || []);
      if (data?.length > 0 && !selected) setSelected(data[0]);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateEnquiry = async (id: string, updates: Partial<ContactEnquiry>) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      if (res.ok) {
        setEnquiries(enquiries.map(e => e.id === id ? { ...e, ...updates } : e));
        if (selected?.id === id) setSelected({ ...selected, ...updates });
      }
    } catch (error) {
      console.error("Error updating enquiry:", error);
    }
  };

  const filtered = enquiries.filter((e) => 
    e.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3B2565]">Enquiry Inbox</h2>
          <p className="text-gray-500 mt-1 font-medium">Manage and respond to messages from the Contact us form.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
          {["All", "New", "Replied", "Closed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                filter === tab ? "bg-[#3B2565] text-white shadow-lg" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
        <div className="lg:col-span-2 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search enquiries..." 
              className="pl-10 h-10 border-gray-100 rounded-xl bg-white shadow-sm" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
            {isLoading ? (
               <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-[#3B2565]" /></div>
            ) : filtered.length === 0 ? (
               <div className="p-10 text-center text-gray-400 font-bold italic">No messages found.</div>
            ) : filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelected(item)}
                className={cn(
                  "bg-white p-5 rounded-2xl border cursor-pointer transition-all",
                  selected?.id === item.id
                    ? "border-[#3B2565]/30 shadow-xl bg-[#3B2565]/5 ring-1 ring-[#3B2565]/20"
                    : "border-gray-100 hover:shadow-md hover:border-gray-200"
                )}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-gradient-to-br from-[#3B2565] to-indigo-500 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">
                      {(item.name || "U").charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-sm text-gray-900 truncate">{item.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold">{item.created_at ? new Date(item.created_at).toLocaleDateString() : ""}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className={cn(
                      "text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest",
                      item.status === "New" ? "bg-blue-100 text-blue-700" :
                      item.status === "Replied" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    )}>{item.status}</span>
                  </div>
                </div>
                <p className="text-xs font-bold text-[#3B2565] truncate mb-1">{item.subject}</p>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{item.message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          {selected ? (
            <Card className="shadow-2xl border-none sticky top-8">
              <CardHeader className="bg-gray-50 border-b border-gray-100 p-8 rounded-t-2xl">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 bg-gradient-to-br from-[#3B2565] to-indigo-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                      {(selected.name || "U").charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#3B2565]">{selected.name}</h3>
                      <p className="text-sm text-gray-500 font-bold">{selected.email}</p>
                      <p className="text-xs text-gray-400">{selected.phone} · Received {selected.created_at ? new Date(selected.created_at).toLocaleString() : ""}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateEnquiry(selected.id, { is_starred: !selected.is_starred })}
                      className="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                    >
                      {selected.is_starred ? <Star size={20} fill="currentColor" className="text-yellow-400" /> : <StarOff size={20} />}
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-8 space-y-8">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Subject</p>
                  <h4 className="text-lg font-black text-[#3B2565]">{selected.subject}</h4>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare size={16} className="text-gray-400" />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Message</p>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mark Status</p>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => updateEnquiry(selected.id, { status: "Replied" })}
                      disabled={selected.status === "Replied"}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-widest h-12 shadow-xl shadow-green-200 flex gap-2"
                    >
                      <CheckCircle size={18} />
                      Mark as Replied
                    </Button>
                    <Button 
                      onClick={() => updateEnquiry(selected.id, { status: "Closed" })}
                      variant="outline"
                      className="flex-1 h-12 border-gray-200 text-gray-500 font-bold"
                    >
                      Close Enquiry
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-300 min-h-[400px]">
              <div className="text-center">
                <Mail size={64} strokeWidth={1} className="mx-auto mb-4" />
                <p className="font-bold text-lg">Select an enquiry to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
