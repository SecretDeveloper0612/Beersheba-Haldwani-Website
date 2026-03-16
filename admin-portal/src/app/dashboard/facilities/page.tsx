"use client";

import React, { useState, useEffect } from "react";
import { Building2, Plus, Trash2, Edit2, ChevronRight, Save, Image as ImageIcon, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Facility } from "@/types/database";
import { cn } from "@/lib/utils";

export default function FacilitiesManagement() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/facilities");
      const { data } = await res.json();
      setFacilities(data || []);
      if (data?.length > 0 && !selectedFacility) setSelectedFacility(data[0]);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFacility) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/facilities/${selectedFacility.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedFacility),
      });
      if (res.ok) {
        fetchFacilities();
      }
    } catch (error) {
      console.error("Error updating facility:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/facilities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedFacility),
      });
      if (res.ok) {
        setIsCreating(false);
        fetchFacilities();
      }
    } catch (error) {
      console.error("Error creating facility:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this facility?")) return;
    try {
      await fetch(`/api/facilities/${id}`, { method: "DELETE" });
      setFacilities(facilities.filter(f => f.id !== id));
      if (selectedFacility?.id === id) setSelectedFacility(null);
    } catch (error) {
      console.error("Error deleting facility:", error);
    }
  };

  const startCreate = () => {
    setSelectedFacility({
      id: "",
      title: "",
      description: "",
      full_description: "",
      cover_image: "",
      icon: "Building2",
      sort_order: facilities.length,
      is_active: true,
      created_at: "",
      updated_at: ""
    } as any);
    setIsCreating(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
             <div className="bg-[#3B2565] p-2 rounded-lg text-white"><Building2 size={24} /></div>
             <h2 className="text-3xl font-extrabold text-[#3B2565]">Facilities Management</h2>
          </div>
          <p className="text-gray-500 mt-1 font-medium ml-12">Manage campus infrastructure and student amenities.</p>
        </div>
        <Button 
          onClick={startCreate}
          className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white flex gap-2 shadow-lg shadow-[#3B2565]/20 h-11 px-6"
        >
          <Plus size={18} />
          Add New Facility
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* List of Facilities */}
         <div className="space-y-4">
            {isLoading ? (
               <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100">
                  <Loader2 className="h-8 w-8 text-[#3B2565] animate-spin mb-4" />
                  <p className="text-gray-500 font-medium">Loading facilities...</p>
               </div>
            ) : facilities.length === 0 && !isCreating ? (
               <div className="text-center p-12 bg-white rounded-2xl border border-gray-100 italic text-gray-400">
                  No facilities found. Add your first facility to get started.
               </div>
            ) : (
               <>
               {facilities.map((item) => (
                  <div 
                     key={item.id} 
                     onClick={() => { setSelectedFacility(item); setIsCreating(false); }}
                     className={cn(
                       "bg-white p-5 rounded-2xl shadow-sm border transition-all group flex items-start gap-4 cursor-pointer",
                       selectedFacility?.id === item.id && !isCreating ? "border-[#3B2565] ring-2 ring-[#3B2565]/10" : "border-gray-100 hover:shadow-xl hover:border-indigo-100"
                     )}
                  >
                     <div className="bg-gray-50 h-24 w-32 rounded-xl flex items-center justify-center text-gray-300 border border-gray-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors shrink-0 overflow-hidden">
                        {item.cover_image ? (
                           <img src={item.cover_image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                           <ImageIcon size={32} />
                        )}
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                           <h3 className="font-black text-lg text-[#3B2565] truncate">{item.title}</h3>
                           <span className={cn(
                              "text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider",
                              item.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                           )}>{item.is_active ? "Active" : "Inactive"}</span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3">{item.description}</p>
                        <div className="flex gap-4">
                           <button className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"><Edit2 size={12} /> Edit Details</button>
                           <button 
                             onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                             className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1"
                           >
                              <Trash2 size={12} /> Remove
                           </button>
                        </div>
                     </div>
                     <div className="self-center text-gray-300 group-hover:text-indigo-400 transition-colors">
                        <ChevronRight size={24} />
                     </div>
                  </div>
               ))}
               </>
            )}
         </div>

         {/* Edit/Add Form */}
         <div className="relative">
            {selectedFacility ? (
               <Card className="shadow-2xl border-none sticky top-8">
                  <CardHeader className="bg-gray-50 border-b border-gray-100 rounded-t-2xl px-8 py-6">
                     <div className="flex justify-between items-center">
                        <div>
                           <CardTitle className="text-xl text-[#3B2565] font-black">
                             {isCreating ? "Add New Facility" : "Edit Facility"}
                           </CardTitle>
                           <CardDescription>
                             {isCreating ? "Fill in the details for the new school facility" : `Update details for ${selectedFacility.title}`}
                           </CardDescription>
                        </div>
                        {isCreating && (
                           <button onClick={() => { setIsCreating(false); setSelectedFacility(facilities[0] || null); }} className="text-gray-400 hover:text-red-500">
                             <X size={20} />
                           </button>
                        )}
                     </div>
                  </CardHeader>
                  <form onSubmit={isCreating ? handleCreate : handleUpdate}>
                     <CardContent className="p-8 space-y-6">
                        <div className="space-y-2">
                           <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Facility Name</label>
                           <Input 
                              required
                              value={selectedFacility.title} 
                              onChange={(e) => setSelectedFacility({...selectedFacility, title: e.target.value})}
                              className="h-12 border-gray-100 font-bold text-lg focus:border-[#3B2565]" 
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Short Description</label>
                           <Input 
                              value={selectedFacility.description || ""} 
                              onChange={(e) => setSelectedFacility({...selectedFacility, description: e.target.value})}
                              className="h-11 border-gray-100 font-medium focus:border-[#3B2565]" 
                           />
                        </div>
                        
                        <div className="space-y-2">
                           <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Cover Image URL</label>
                           <div className="flex gap-3">
                              <Input 
                                 value={selectedFacility.cover_image || ""} 
                                 onChange={(e) => setSelectedFacility({...selectedFacility, cover_image: e.target.value})}
                                 className="h-11 border-gray-100 font-medium focus:border-[#3B2565]" 
                                 placeholder="https://..."
                              />
                           </div>
                           {selectedFacility.cover_image && (
                              <div className="mt-2 h-32 w-full rounded-xl overflow-hidden border border-gray-100">
                                 <img src={selectedFacility.cover_image} className="w-full h-full object-cover" />
                              </div>
                           )}
                        </div>

                        <div className="space-y-2">
                           <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Full Description (Website Detail Page)</label>
                           <textarea 
                              className="w-full h-40 bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm text-gray-600 leading-relaxed outline-none focus:bg-white focus:border-[#3B2565] transition-all shadow-inner"
                              value={selectedFacility.full_description || ""}
                              onChange={(e) => setSelectedFacility({...selectedFacility, full_description: e.target.value})}
                           />
                        </div>

                        <div className="flex gap-4 pt-4">
                           <Button 
                              type="submit"
                              disabled={isSaving}
                              className="flex-1 bg-[#3B2565] hover:bg-[#2A1a4a] text-white h-12 font-black text-sm uppercase tracking-widest shadow-lg shadow-[#3B2565]/20"
                           >
                              {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save size={18} className="mr-2" />}
                              {isCreating ? "Create Facility" : "Update Facility"}
                           </Button>
                           {!isCreating && (
                              <Button type="button" variant="outline" onClick={() => fetchFacilities()} className="h-12 border-gray-200 text-gray-400 font-bold px-8 underline decoration-dotted">Reset</Button>
                           )}
                        </div>
                     </CardContent>
                  </form>
               </Card>
            ) : (
               <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 h-[600px] flex flex-col items-center justify-center text-gray-400 p-8 text-center sticky top-8">
                  <Building2 size={64} className="mb-4 opacity-20" />
                  <p className="font-bold text-lg">Select a facility to edit</p>
                  <p className="text-sm">Choose from the list on the left to view and modify details.</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}


