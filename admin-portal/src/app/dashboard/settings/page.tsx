"use client";

import React, { useState, useEffect } from "react";
import { Shield, Bell, Database, Globe, User, Save, RefreshCw, Key, Loader2, Check, School, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SiteSettings } from "@/types/database";
import { cn } from "@/lib/utils";

type TabType = "profile" | "school" | "security" | "notifications" | "system";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("school");
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/site-settings");
      const { data } = await res.json();
      setSettings(data || {});
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSaving(true);
    setSaveStatus("idle");
    try {
      const res = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaveStatus("success");
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3B2565]">Portal Settings</h2>
          <p className="text-gray-500 mt-1 font-medium">Manage your admin account and global portal configurations.</p>
        </div>
        <Button 
          onClick={() => handleSave()}
          disabled={isSaving}
          className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white flex gap-2 shadow-lg h-11 px-8 rounded-full"
        >
          {isSaving ? <Loader2 className="animate-spin" /> : saveStatus === "success" ? <Check /> : <Save size={18} />}
          {isSaving ? "Saving..." : saveStatus === "success" ? "Saved!" : "Save All Settings"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Sidebar Navigation */}
         <div className="lg:col-span-1 space-y-2">
            <SettingsTab icon={School} label="School Information" active={activeTab === "school"} onClick={() => setActiveTab("school")} />
            <SettingsTab icon={User} label="Admin Profile" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
            <SettingsTab icon={Shield} label="Security & Password" active={activeTab === "security"} onClick={() => setActiveTab("security")} />
            <SettingsTab icon={Globe} label="Website Links" active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} />
            <SettingsTab icon={Database} label="System & Logs" active={activeTab === "system"} onClick={() => setActiveTab("system")} />
         </div>

         {/* Content Area */}
         <div className="lg:col-span-2 space-y-8">
            {isLoading ? (
               <div className="p-20 flex flex-col items-center justify-center text-gray-400 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <Loader2 size={48} className="animate-spin mb-4" />
                  <p className="font-bold">Syncing settings...</p>
               </div>
            ) : activeTab === "school" ? (
              <Card className="shadow-xl border-none">
                 <CardHeader className="bg-gray-50 border-b border-gray-100 rounded-t-2xl p-8">
                    <CardTitle className="text-xl text-[#3B2565] font-black uppercase tracking-tight">School Identification</CardTitle>
                    <CardDescription>Configure primary branding and contact details for the school.</CardDescription>
                 </CardHeader>
                 <CardContent className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Official School Name</label>
                          <Input 
                            value={settings.school_name || ""} 
                            onChange={(e) => setSettings({...settings, school_name: e.target.value})}
                            className="h-11 font-bold" 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Phone</label>
                          <Input 
                            value={settings.phone || ""} 
                            onChange={(e) => setSettings({...settings, phone: e.target.value})}
                            className="h-11 font-medium" 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Official Email</label>
                          <Input 
                            value={settings.email || ""} 
                            onChange={(e) => setSettings({...settings, email: e.target.value})}
                            className="h-11 font-medium" 
                          />
                       </div>
                       <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">School Address</label>
                          <Input 
                            value={settings.address || ""} 
                            onChange={(e) => setSettings({...settings, address: e.target.value})}
                            className="h-11 font-medium" 
                          />
                       </div>
                    </div>

                    <div className="pt-8 border-t border-gray-50 grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Board</label>
                          <Input 
                            value={settings.affiliation_board || ""} 
                            onChange={(e) => setSettings({...settings, affiliation_board: e.target.value})}
                            placeholder="e.g. CBSE"
                            className="h-11 font-black" 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Affiliation No.</label>
                          <Input 
                            value={settings.affiliation_number || ""} 
                            onChange={(e) => setSettings({...settings, affiliation_number: e.target.value})}
                            className="h-11 font-black" 
                          />
                       </div>
                       <div className="space-y-2 text-center">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Admissions</label>
                          <div className="flex items-center justify-center h-11">
                             <button 
                               onClick={() => setSettings({...settings, admission_open: !settings.admission_open})}
                               className={cn(
                                 "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                                 settings.admission_open ? "bg-green-500 text-white shadow-lg shadow-green-200" : "bg-gray-100 text-gray-400"
                               )}
                             >
                               {settings.admission_open ? "Open" : "Closed"}
                             </button>
                          </div>
                       </div>
                    </div>
                 </CardContent>
              </Card>
            ) : activeTab === "profile" ? (
              <Card className="shadow-xl border-none">
                 <CardHeader className="bg-gray-50 border-b border-gray-100 rounded-t-2xl p-8">
                    <CardTitle className="text-xl text-[#3B2565] font-black uppercase tracking-tight">Admin Profile</CardTitle>
                    <CardDescription>Update your personal and school identification details.</CardDescription>
                 </CardHeader>
                 <CardContent className="p-8 space-y-6">
                    <div className="flex items-center gap-6 mb-4">
                       <div className="h-20 w-20 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-300 border-2 border-dashed border-gray-200">
                          <User size={32} />
                       </div>
                       <div>
                          <Button variant="outline" size="sm" className="font-bold border-indigo-100 text-[#3B2565]">Change Photo</Button>
                          <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest">Recommended: 400x400px</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                          <Input defaultValue="Administrative Officer" className="h-11 font-bold" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Job Title</label>
                          <Input defaultValue="Super Admin" className="h-11 font-medium" />
                       </div>
                       <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                          <Input defaultValue="website.beersheba@gmail.com" className="h-11 font-bold" disabled />
                          <p className="text-[10px] text-gray-400 font-medium italic">Contact the system owner to change your primary email.</p>
                       </div>
                    </div>
                 </CardContent>
              </Card>
            ) : (
              <div className="bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200 p-20 text-center flex flex-col items-center">
                 <Info className="text-gray-300 mb-4" size={48} />
                 <p className="text-gray-400 font-bold italic">This section is currently under maintenance or uses restricted system configurations.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}

function SettingsTab({ icon: Icon, label, active, onClick }: { icon: React.ElementType; label: string; active?: boolean; onClick: () => void }) {
   return (
      <button 
        onClick={onClick}
        className={cn(
         "flex items-center gap-3 w-full px-5 py-4 rounded-2xl transition-all duration-200 text-left",
         active 
            ? "bg-white border border-gray-100 text-[#3B2565] font-black shadow-xl -translate-r-2" 
            : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
      )}>
         <Icon className={cn("h-5 w-5", active ? "text-[#3B2565]" : "text-gray-400")} />
         <span className="text-sm uppercase tracking-tight">{label}</span>
      </button>
   )
}


