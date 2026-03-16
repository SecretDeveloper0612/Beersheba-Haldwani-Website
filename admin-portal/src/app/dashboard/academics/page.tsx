"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, Plus, BookOpen, Edit2, Trash2, ChevronRight, Save, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AcademicProgram } from "@/types/database";

export default function AcademicsManagement() {
  const [programs, setPrograms] = useState<AcademicProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<AcademicProgram | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await fetch("/api/academics");
      const { data } = await res.json();
      setPrograms(data || []);
      if (data?.length > 0) setSelectedProgram(data[0]);
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/academics/${selectedProgram.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedProgram),
      });
      if (res.ok) {
        fetchPrograms();
      }
    } catch (error) {
      console.error("Error updating program:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const addHighlight = () => {
    if (!selectedProgram) return;
    setSelectedProgram({
      ...selectedProgram,
      highlights: [...(selectedProgram.highlights || []), ""]
    });
  };

  const updateHighlight = (index: number, value: string) => {
    if (!selectedProgram) return;
    const newHighlights = [...selectedProgram.highlights];
    newHighlights[index] = value;
    setSelectedProgram({ ...selectedProgram, highlights: newHighlights });
  };

  const removeHighlight = (index: number) => {
    if (!selectedProgram) return;
    const newHighlights = selectedProgram.highlights.filter((_, i) => i !== index);
    setSelectedProgram({ ...selectedProgram, highlights: newHighlights });
  };
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3B2565]">Academic Programs</h2>
          <p className="text-gray-500 mt-1 font-medium">Manage curriculum details and academic levels for the website.</p>
        </div>
        <Button className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white flex gap-2 shadow-lg h-11 px-8">
          <Plus size={18} />
          Add Program Level
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
         {/* Academic Levels Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? (
               <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100">
                  <Loader2 className="h-8 w-8 text-[#3B2565] animate-spin mb-4" />
                  <p className="text-gray-500 font-medium">Loading programs...</p>
               </div>
            ) : programs.map((level) => (
               <Card 
                  key={level.id} 
                  onClick={() => setSelectedProgram(level)}
                  className={cn(
                    "shadow-sm transition-all cursor-pointer group overflow-hidden border-t-4",
                    selectedProgram?.id === level.id ? "border-t-[#3B2565] ring-2 ring-[#3B2565]/10 bg-white shadow-xl" : "border-t-gray-200 border-gray-100 bg-white hover:shadow-md"
                  )}
               >
                  <CardHeader className="p-6">
                     <div className="flex justify-between items-start mb-4">
                        <div className={cn(
                           "p-3 rounded-2xl", 
                           level.color_theme === "pink" ? "bg-pink-50 text-pink-700" :
                           level.color_theme === "blue" ? "bg-blue-50 text-blue-700" :
                           level.color_theme === "green" ? "bg-green-50 text-green-700" :
                           "bg-purple-50 text-purple-700"
                        )}>
                           <BookOpen size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order: {level.sort_order}</span>
                     </div>
                     <CardTitle className="text-xl text-[#3B2565] font-black">{level.title}</CardTitle>
                     <p className="text-xs text-gray-400 font-bold mt-1">Target Age: {level.age_range}</p>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0 space-y-4">
                     <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{level.description}</p>
                     <div className="flex pt-4 border-t border-gray-50 items-center justify-between">
                        <div className="flex gap-2">
                           <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
                           <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                        </div>
                        <ChevronRight className={cn("transition-colors", selectedProgram?.id === level.id ? "text-[#3B2565]" : "text-gray-300 group-hover:text-[#3B2565]")} />
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>

         {/* Detailed Editor */}
         <div className="space-y-6">
            {selectedProgram ? (
               <Card className="shadow-2xl border-none">
                  <CardHeader className="bg-gray-50 border-b border-gray-100 rounded-t-2xl p-8">
                     <div className="flex items-center gap-4">
                        <div className="bg-[#3B2565] p-3 rounded-2xl text-white shadow-lg"><GraduationCap size={24} /></div>
                        <div>
                           <CardTitle className="text-xl text-[#3B2565] font-black uppercase tracking-tight">Program Details</CardTitle>
                           <CardDescription>Edit content for {selectedProgram.title}</CardDescription>
                        </div>
                     </div>
                  </CardHeader>
                  <form onSubmit={handleUpdate}>
                     <CardContent className="p-8 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title</label>
                              <Input 
                                 value={selectedProgram.title} 
                                 onChange={(e) => setSelectedProgram({...selectedProgram, title: e.target.value})}
                                 className="h-11 font-bold" 
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Age Range</label>
                              <Input 
                                 value={selectedProgram.age_range || ""} 
                                 onChange={(e) => setSelectedProgram({...selectedProgram, age_range: e.target.value})}
                                 className="h-11 font-medium" 
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Intro Description</label>
                           <textarea 
                              className="w-full h-24 bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm text-gray-600 leading-relaxed outline-none focus:bg-white transition-all shadow-inner"
                              value={selectedProgram.description || ""}
                              onChange={(e) => setSelectedProgram({...selectedProgram, description: e.target.value})}
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Key Highlights (Points)</label>
                           <div className="space-y-2">
                              {selectedProgram.highlights?.map((highlight, idx) => (
                                 <div key={idx} className="flex gap-2">
                                    <Input 
                                       value={highlight} 
                                       onChange={(e) => updateHighlight(idx, e.target.value)}
                                       className="h-10 text-xs font-medium bg-gray-50/50 border-gray-100" 
                                    />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeHighlight(idx)} className="text-gray-300 hover:text-red-500 shrink-0"><Trash2 size={16} /></Button>
                                 </div>
                              ))}
                              <Button type="button" variant="outline" onClick={addHighlight} size="sm" className="w-full border-dashed border-2 py-6 text-gray-400 hover:text-[#3B2565]">
                                 <Plus size={16} className="mr-2" /> Add Level Highlight
                              </Button>
                           </div>
                        </div>

                        <div className="pt-4 flex gap-3">
                           <Button 
                              type="submit" 
                              disabled={isSaving}
                              className="flex-1 bg-[#3B2565] hover:bg-[#2A1a4a] text-white font-black uppercase tracking-widest h-12 shadow-xl shadow-[#3B2565]/20"
                           >
                              {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="mr-2" size={18} />}
                              Update Level
                           </Button>
                        </div>
                     </CardContent>
                  </form>
               </Card>
            ) : (
               <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 h-[600px] flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                  <GraduationCap size={64} className="mb-4 opacity-20" />
                  <p className="font-bold text-lg">Select a program to edit</p>
                  <p className="text-sm">Choose an academic level from the grid to modify its content.</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}

function PointItem({ value }: { value: string }) {
   return (
      <div className="flex gap-2">
         <Input defaultValue={value} className="h-10 text-xs font-medium bg-gray-50/50 border-gray-100" />
         <Button variant="ghost" size="icon" className="text-gray-300 hover:text-red-500 shrink-0"><Trash2 size={16} /></Button>
      </div>
   )
}


