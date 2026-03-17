"use client";

import React, { useState, useEffect } from "react";
import { Users, Plus, Edit2, Trash2, Save, Loader2, X, GraduationCap, Mail, Phone, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MediaSelector } from "@/components/media-selector";
import { cn } from "@/lib/utils";

export default function TeachersManagement() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/teachers");
      const { data } = await res.json();
      setTeachers(data || []);
      if (data?.length > 0 && !selectedTeacher) setSelectedTeacher(data[0]);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacher) return;
    setIsSaving(true);
    try {
      const method = selectedTeacher.id ? "PUT" : "POST";
      const url = selectedTeacher.id ? `/api/teachers/${selectedTeacher.id}` : "/api/teachers";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedTeacher),
      });
      if (res.ok) {
        fetchTeachers();
      }
    } catch (error) {
      console.error("Error saving teacher:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this teacher?")) return;
    try {
      const res = await fetch(`/api/teachers/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTeachers(teachers.filter(t => t.id !== id));
        if (selectedTeacher?.id === id) setSelectedTeacher(teachers[0] || null);
      }
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3B2565]">Faculty Management</h2>
          <p className="text-gray-500 mt-1 font-medium">Manage teacher profiles and designations for the website.</p>
        </div>
        <Button 
          onClick={() => setSelectedTeacher({ name: "", designation: "", department: "", imageUrl: "", id: "" })}
          className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white flex gap-2 shadow-lg h-11 px-8 rounded-full"
        >
          <Plus size={18} />
          Add Faculty Member
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         {/* Teacher List */}
         <div className="xl:col-span-1 space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
            {isLoading ? (
               <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 italic text-gray-400">
                  <Loader2 className="h-8 w-8 text-[#3B2565] animate-spin mb-4" />
                  Loading faculty...
               </div>
            ) : teachers.length === 0 ? (
               <div className="text-center p-12 bg-white rounded-2xl border border-gray-100 italic text-gray-400">
                  No faculty records found.
               </div>
            ) : teachers.map((teacher) => (
               <div 
                  key={teacher.id} 
                  onClick={() => setSelectedTeacher(teacher)}
                  className={cn(
                    "bg-white p-4 rounded-2xl shadow-sm border transition-all cursor-pointer flex items-center gap-4 group",
                    selectedTeacher?.id === teacher.id ? "border-[#3B2565] ring-2 ring-[#3B2565]/10 bg-[#3B2565]/5" : "border-gray-100 hover:border-indigo-100"
                  )}
               >
                  <div className="h-14 w-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                     <img 
                        src={(teacher.image?.url || teacher.imageUrl) || "/assets/image/placeholder.jpg"} 
                        alt={teacher.name} 
                        className="w-full h-full object-cover" 
                     />
                  </div>
                  <div className="flex-1 min-w-0">
                     <h3 className="font-black text-[#3B2565] truncate">{teacher.name}</h3>
                     <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{teacher.designation}</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(teacher.id); }}
                    className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
               </div>
            ))}
         </div>

         {/* Teacher Form */}
         <div className="xl:col-span-2">
            {selectedTeacher ? (
               <Card className="shadow-2xl border-none">
                  <CardHeader className="bg-gray-50 border-b border-gray-100 rounded-t-2xl p-8">
                     <CardTitle className="text-xl text-[#3B2565] font-black uppercase tracking-tight flex items-center gap-2">
                        <Users className="text-indigo-600" />
                        {selectedTeacher.id ? "Edit Faculty Profile" : "New Faculty Member"}
                     </CardTitle>
                  </CardHeader>
                  <form onSubmit={handleSave}>
                     <CardContent className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                              <div className="relative">
                                 <Plus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-500 opacity-50" />
                                 <Input 
                                    required
                                    value={selectedTeacher.name} 
                                    onChange={(e) => setSelectedTeacher({...selectedTeacher, name: e.target.value})}
                                    className="pl-10 h-12 font-bold" 
                                 />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Designation</label>
                              <div className="relative">
                                 <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-500 opacity-50" />
                                 <Input 
                                    required
                                    value={selectedTeacher.designation} 
                                    onChange={(e) => setSelectedTeacher({...selectedTeacher, designation: e.target.value})}
                                    className="pl-10 h-12 font-bold" 
                                 />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Department</label>
                              <Input 
                                 value={selectedTeacher.department} 
                                 onChange={(e) => setSelectedTeacher({...selectedTeacher, department: e.target.value})}
                                 className="h-12 font-bold" 
                                 placeholder="e.g. Science, Mathematics"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Qualification</label>
                              <div className="relative">
                                 <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-500 opacity-50" />
                                 <Input 
                                    value={selectedTeacher.qualification || ""} 
                                    onChange={(e) => setSelectedTeacher({...selectedTeacher, qualification: e.target.value})}
                                    className="pl-10 h-12 font-bold" 
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Profile Image</label>
                              <Button 
                                 type="button" 
                                 variant="link" 
                                 onClick={() => setIsMediaSelectorOpen(true)}
                                 className="text-[#3B2565] font-black text-xs uppercase"
                              >
                                 Browse Library
                              </Button>
                           </div>
                           <div className="flex gap-6 items-center">
                              <div className="h-32 w-32 rounded-3xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-100 flex items-center justify-center shrink-0">
                                 {(selectedTeacher.imageUrl || selectedTeacher.image?.url) ? (
                                    <img 
                                       src={selectedTeacher.imageUrl || selectedTeacher.image?.url} 
                                       className="w-full h-full object-cover" 
                                    />
                                 ) : (
                                    <Users size={48} className="text-gray-200" />
                                 )}
                              </div>
                              <Input 
                                 value={selectedTeacher.imageUrl || selectedTeacher.image?.url || ""} 
                                 onChange={(e) => setSelectedTeacher({...selectedTeacher, imageUrl: e.target.value})}
                                 placeholder="Paste image URL or browse library"
                                 className="flex-1 h-12"
                              />
                           </div>
                        </div>

                        <Button 
                           type="submit" 
                           disabled={isSaving}
                           className="w-full bg-[#3B2565] hover:bg-[#2A1a4a] text-white font-black uppercase tracking-widest h-14 shadow-xl shadow-[#3B2565]/20 mt-4 rounded-2xl"
                        >
                           {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="mr-2" size={18} />}
                           {selectedTeacher.id ? "Update Profile" : "Save Profile"}
                        </Button>
                     </CardContent>
                  </form>
               </Card>
            ) : (
               <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 h-[600px] flex flex-col items-center justify-center text-gray-400 p-8 text-center sticky top-8">
                  <Users size={64} className="mb-4 opacity-10" />
                  <p className="font-bold text-lg text-gray-300">Select a faculty member to manage their profile</p>
               </div>
            )}
         </div>
      </div>

      {isMediaSelectorOpen && (
        <MediaSelector 
          onSelect={(url) => setSelectedTeacher({...selectedTeacher, imageUrl: url})}
          onClose={() => setIsMediaSelectorOpen(false)}
          currentUrl={selectedTeacher?.imageUrl || selectedTeacher?.image?.url}
        />
      )}
    </div>
  );
}
