"use client";

import React, { useState, useEffect } from "react";
import { Search as SearchIcon, Globe, Image as ImageIcon, Save, Info, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SeoSetting } from "@/types/database";

export default function SEOManagement() {
  const [pages, setPages] = useState<SeoSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState<SeoSetting | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSEO();
  }, []);

  const fetchSEO = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/seo");
      const { data } = await res.json();
      setPages(data || []);
      if (data?.length > 0) setSelectedPage(data[0]);
    } catch (error) {
      console.error("Error fetching SEO:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedPage) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPage),
      });
      if (res.ok) {
        setPages(pages.map(p => p.id === selectedPage.id ? selectedPage : p));
      }
    } catch (error) {
      console.error("Error saving SEO:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const calculateScore = (page: SeoSetting) => {
    let score = 0;
    if (page.meta_title) score += 40;
    if (page.meta_description) score += 40;
    if (page.focus_keywords) score += 20;
    return score;
  };

  const filteredPages = pages.filter(p => 
    p.page_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.page_path?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3B2565]">SEO Settings</h2>
          <p className="text-gray-500 mt-1 font-medium">Configure search engine metadata and OpenGraph settings for your pages.</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving || !selectedPage}
          className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white flex gap-2 shadow-lg shadow-[#3B2565]/20 h-11 px-8"
        >
          {isSaving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
          Save SEO Config
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 relative">
               <SearchIcon className="absolute left-7 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
               <Input 
                 placeholder="Search pages..." 
                 className="pl-10 h-10 border-gray-100 rounded-xl" 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>

            <div className="space-y-3">
               {isLoading ? (
                  <div className="p-10 text-center text-gray-400 font-bold">Loading pages...</div>
               ) : filteredPages.map((page) => {
                  const score = calculateScore(page);
                  return (
                    <div 
                      key={page.id} 
                      onClick={() => setSelectedPage(page)}
                      className={cn(
                        "bg-white p-4 rounded-2xl shadow-sm border transition-all cursor-pointer group",
                        selectedPage?.id === page.id ? "border-[#3B2565] ring-2 ring-[#3B2565]/5" : "border-gray-100 hover:shadow-md hover:border-indigo-100"
                      )}
                    >
                       <div className="flex items-center justify-between mb-2">
                          <h3 className="font-black text-[#3B2565] text-sm group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{page.page_name}</h3>
                          <span className={cn(
                             "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                             score > 80 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                          )}>{score > 80 ? "Optimized" : "Needs Work"}</span>
                       </div>
                       <p className="text-xs text-gray-400 font-bold mb-3">{page.page_path}</p>
                       <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                             <div 
                                className={cn("h-full rounded-full transition-all duration-1000", score > 80 ? "bg-green-500" : "bg-orange-500")} 
                                style={{ width: `${score}%` }} 
                             />
                          </div>
                          <span className="text-[10px] font-black text-gray-500">{score}%</span>
                       </div>
                    </div>
                  );
               })}
            </div>
         </div>

         <div className="lg:col-span-2 space-y-8">
            {selectedPage ? (
              <Card className="shadow-2xl border-none">
                 <CardHeader className="bg-gray-50 border-b border-gray-100 rounded-t-2xl p-8">
                    <div className="flex items-center gap-4">
                       <div className="bg-white p-3 rounded-2xl shadow-sm text-[#3B2565]"><Globe size={24} /></div>
                       <div>
                          <CardTitle className="text-xl text-[#3B2565] font-black uppercase tracking-tight">{selectedPage.page_name} Metadata</CardTitle>
                          <CardDescription>Configure how this page appears in Google search results.</CardDescription>
                       </div>
                    </div>
                 </CardHeader>
                 <CardContent className="p-8 space-y-8">
                    <div className="space-y-3">
                       <div className="flex items-center justify-between">
                          <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Meta Title</label>
                          <span className={cn("text-[10px] font-bold", (selectedPage.meta_title?.length || 0) > 70 ? "text-red-500" : "text-green-600")}>
                            {selectedPage.meta_title?.length || 0} / 70 characters
                          </span>
                       </div>
                       <Input 
                         value={selectedPage.meta_title || ""} 
                         onChange={(e) => setSelectedPage({...selectedPage, meta_title: e.target.value})}
                         className="h-12 border-gray-100 font-bold" 
                       />
                    </div>

                    <div className="space-y-3">
                       <div className="flex items-center justify-between">
                          <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Meta Description</label>
                          <span className={cn("text-[10px] font-bold", (selectedPage.meta_description?.length || 0) > 160 ? "text-red-500" : "text-green-600")}>
                            {selectedPage.meta_description?.length || 0} / 160 characters
                          </span>
                       </div>
                       <textarea 
                          className="w-full h-32 bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm text-gray-600 leading-relaxed outline-none focus:bg-white transition-all shadow-inner"
                          value={selectedPage.meta_description || ""}
                          onChange={(e) => setSelectedPage({...selectedPage, meta_description: e.target.value})}
                       />
                    </div>

                    <div className="space-y-3">
                       <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Focus Keywords (Comma separated)</label>
                       <Input 
                         value={selectedPage.focus_keywords || ""} 
                         onChange={(e) => setSelectedPage({...selectedPage, focus_keywords: e.target.value})}
                         className="h-12 border-gray-100 font-medium" 
                       />
                    </div>

                    <div className="pt-8 border-t border-gray-50">
                       <h4 className="text-sm font-black text-[#3B2565] flex items-center gap-2 mb-6 uppercase tracking-widest">
                          <ImageIcon size={18} className="text-indigo-500" />
                          Social Preview (OpenGraph)
                       </h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                             <div className="aspect-video bg-gray-100 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-gray-300 gap-2 relative overflow-hidden group">
                                 {selectedPage.og_image ? (
                                   <img src={selectedPage.og_image} alt="OG" className="w-full h-full object-cover" />
                                 ) : (
                                   <>
                                     <ImageIcon size={40} className="group-hover:scale-110 transition-transform duration-500" />
                                     <p className="text-[10px] font-black uppercase tracking-widest">No Image Selected</p>
                                   </>
                                 )}
                                 <div className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold text-xs cursor-pointer">
                                    Change Social Image
                                 </div>
                             </div>
                             <Input 
                               placeholder="OG Image URL" 
                               value={selectedPage.og_image || ""}
                               onChange={(e) => setSelectedPage({...selectedPage, og_image: e.target.value})}
                               className="h-10 text-xs"
                             />
                          </div>
                          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full justify-between grayscale">
                             <div className="h-24 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                                {selectedPage.og_image && <img src={selectedPage.og_image} className="w-full h-full object-cover opacity-50" />}
                             </div>
                             <div>
                                <div className="h-2 w-1/2 bg-gray-200 rounded mb-2" />
                                <div className="text-[10px] font-bold text-gray-400 line-clamp-1">{selectedPage.meta_title}</div>
                                <div className="text-[10px] text-gray-300 line-clamp-2 mt-1">{selectedPage.meta_description}</div>
                             </div>
                             <div className="mt-4 pt-4 border-t border-gray-50">
                                <span className="text-[10px] font-black text-gray-300 uppercase underline">Preview Mockup</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 p-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
                 Select a page to edit SEO settings
              </div>
            )}

            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 flex gap-4">
               <div className="p-3 bg-white rounded-xl text-indigo-600 shadow-sm h-fit"><Info size={20} /></div>
               <div>
                  <h4 className="font-black text-indigo-900 text-sm mb-1 uppercase tracking-tight">SEO Performance Tip</h4>
                  <p className="text-xs text-indigo-700 leading-relaxed font-medium">
                     Ensure your Meta Titles are between 50-70 characters and Meta Descriptions are between 120-160 characters for best visibility in search results.
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}


