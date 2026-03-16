"use client";

import React, { useState, useEffect } from "react";
import { 
  Save, 
  History, 
  Target, 
  Compass, 
  Users, 
  Quote,
  FileEdit,
  Loader2,
  Trash2,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AboutContent } from "@/types/database";

export default function AboutManagement() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const res = await fetch("/api/about");
      const { data } = await res.json();
      setContent(data);
    } catch (error) {
      console.error("Error fetching about content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) alert("About content updated successfully!");
    } catch (error) {
      console.error("Error saving about content:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20">
        <Loader2 className="h-10 w-10 text-[#3B2565] animate-spin mb-4" />
        <p className="text-gray-500 font-bold">Loading about page content...</p>
      </div>
    );
  }

  const data = content || {
    history_heading: "",
    history_text: "",
    mission_text: "",
    vision_text: "",
    founder_name: "",
    founder_quote: "",
    principal_name: "",
    principal_message: ""
  } as AboutContent;

  const updateField = (field: keyof AboutContent, value: string) => {
    setContent(prev => ({ ...(prev || data), [field]: value } as AboutContent));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3B2565]">About Page Manager</h2>
          <p className="text-gray-500 mt-1 font-medium">Manage school history, vision, and mission details.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white flex gap-2 shadow-lg shadow-[#3B2565]/20"
          >
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Publish Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         <div className="xl:col-span-2 space-y-8">
            <Card className="shadow-xl border-none">
               <CardHeader className="bg-gray-50 border-b border-gray-100 rounded-t-2xl">
                  <CardTitle className="text-xl text-[#3B2565] flex items-center gap-2">
                     <History className="h-5 w-5" />
                     School History
                  </CardTitle>
                  <CardDescription>Edit the historical narrative of Beersheba School.</CardDescription>
               </CardHeader>
               <CardContent className="p-6">
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Section Heading</label>
                        <Input 
                          value={data.history_heading || ""} 
                          onChange={(e) => updateField("history_heading", e.target.value)}
                          className="font-bold border-gray-100 h-12 text-lg" 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Historical Narrative</label>
                        <textarea 
                           className="w-full h-64 p-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-600 text-sm leading-relaxed outline-none focus:bg-white transition-all shadow-inner"
                           value={data.history_text || ""}
                           onChange={(e) => updateField("history_text", e.target.value)}
                        />
                     </div>
                  </div>
               </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card className="shadow-xl border-none overflow-hidden">
                  <div className="h-1 bg-indigo-500 w-full" />
                  <CardHeader className="p-6">
                     <CardTitle className="text-lg text-[#3B2565] flex items-center gap-2 font-black">
                        <Target className="h-5 w-5 text-indigo-500" />
                        Our Mission
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                     <textarea 
                        className="w-full h-40 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-gray-600 leading-relaxed outline-none focus:bg-white transition-all"
                        value={data.mission_text || ""}
                        onChange={(e) => updateField("mission_text", e.target.value)}
                     />
                  </CardContent>
               </Card>

               <Card className="shadow-xl border-none overflow-hidden">
                  <div className="h-1 bg-purple-500 w-full" />
                  <CardHeader className="p-6">
                     <CardTitle className="text-lg text-[#3B2565] flex items-center gap-2 font-black">
                        <Compass className="h-5 w-5 text-purple-500" />
                        Our Vision
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                     <textarea 
                        className="w-full h-40 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-gray-600 leading-relaxed outline-none focus:bg-white transition-all"
                        value={data.vision_text || ""}
                        onChange={(e) => updateField("vision_text", e.target.value)}
                     />
                  </CardContent>
               </Card>
            </div>
         </div>

         <div className="space-y-8">
            <Card className="shadow-xl border-none bg-gradient-to-br from-[#3B2565] to-[#2A1a4a] text-white">
               <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 font-black">
                     <Quote className="h-5 w-5 opacity-40" />
                     Founder&apos;s Word
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <textarea 
                     className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-4 text-xs italic leading-relaxed text-white/90 outline-none focus:bg-white/20"
                     value={data.founder_quote || ""}
                     onChange={(e) => updateField("founder_quote", e.target.value)}
                     placeholder="Quote from the late founder..."
                  />
                  <Input 
                    value={data.founder_name || ""} 
                    onChange={(e) => updateField("founder_name", e.target.value)}
                    placeholder="Founder Name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10 text-xs font-bold" 
                  />
               </CardContent>
            </Card>

            <Card className="shadow-xl border-none">
               <CardHeader className="border-b border-gray-50 p-6">
                  <CardTitle className="text-lg text-[#3B2565] flex items-center gap-2 font-black uppercase tracking-tighter text-center">
                     Principal Message
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Principal Name</label>
                     <Input 
                        value={data.principal_name || ""} 
                        onChange={(e) => updateField("principal_name", e.target.value)}
                        className="h-10 border-gray-100 font-bold" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Message Content</label>
                     <textarea 
                        className="w-full h-40 bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs text-gray-600 outline-none focus:bg-white"
                        value={data.principal_message || ""}
                        onChange={(e) => updateField("principal_message", e.target.value)}
                        placeholder="Write message from the principal..."
                     />
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}

function FactItem({ label, value }: { label: string, value: string }) {
   return (
      <div className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
         <div className="flex-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</p>
            <Input defaultValue={value} className="h-8 py-0 font-black text-[#3B2565] bg-transparent border-none shadow-none focus-visible:ring-0 p-0" />
         </div>
         <Trash2 size={16} className="text-gray-300 hover:text-red-500 cursor-pointer" />
      </div>
   )
}


