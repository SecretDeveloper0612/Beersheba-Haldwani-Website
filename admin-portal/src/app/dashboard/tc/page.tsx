"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, FileText, Download, Edit2, Trash2, CheckCircle, Clock, AlertCircle, Loader2, X, Save, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TransferCertificate } from "@/types/database";

export default function TCManagement() {
  const [items, setItems] = useState<TransferCertificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<TransferCertificate> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchTCs();
  }, []);

  const fetchTCs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/tc");
      const { data } = await res.json();
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching TCs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.tc_number || !editingItem?.student_name) return;
    
    setIsSaving(true);
    try {
      const method = editingItem.id ? "PUT" : "POST";
      const url = editingItem.id ? `/api/tc/${editingItem.id}` : "/api/tc";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      if (res.ok) {
        fetchTCs();
        setIsEditorOpen(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error("Error saving TC:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      await fetch(`/api/tc/${id}`, { method: "DELETE" });
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting TC:", error);
    }
  };

  const toggleVerify = async (item: TransferCertificate) => {
    try {
      const res = await fetch(`/api/tc/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_verified: !item.is_verified }),
      });
      if (res.ok) {
        setItems(items.map(i => i.id === item.id ? { ...i, is_verified: !item.is_verified } : i));
      }
    } catch (error) {
      console.error("Error toggling verification:", error);
    }
  };

  const filteredItems = items.filter(item => 
    item.tc_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.admission_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3B2565]">TC Management</h2>
          <p className="text-gray-500 mt-1 font-medium">Manage and verify Transfer Certificates for alumni and students.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => {
              setEditingItem({
                tc_number: `TC/${new Date().getFullYear()}/${(items.length + 1).toString().padStart(3, '0')}`,
                student_name: "",
                father_name: "",
                admission_number: "",
                class_at_leaving: "",
                date_of_leaving: new Date().toISOString().split('T')[0],
                is_verified: true,
                conduct: "Good"
              });
              setIsEditorOpen(true);
            }}
            className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white flex gap-2"
          >
            <Plus size={18} />
            Issue New TC
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <StatSmall icon={CheckCircle} label="Total Issued" value={items.length.toString()} color="text-green-600" bg="bg-green-50" />
         <StatSmall icon={CheckCircle2} label="Verified" value={items.filter(i => i.is_verified).length.toString()} color="text-blue-600" bg="bg-blue-50" />
         <StatSmall icon={AlertCircle} label="Pending Review" value={items.filter(i => !i.is_verified).length.toString()} color="text-orange-600" bg="bg-orange-50" />
      </div>

      <Card className="shadow-sm border-gray-100">
        <CardHeader className="bg-white border-b border-gray-100">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-lg text-[#3B2565]">Transfer Certificate Records</CardTitle>
              <div className="relative w-full md:w-80">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                 <Input 
                   placeholder="Search by TC No. or Student..." 
                   className="pl-10 h-10 border-gray-200" 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
           </div>
        </CardHeader>
        <CardContent className="p-0">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-gray-50 text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <tr>
                       <th className="px-6 py-4">TC Number</th>
                       <th className="px-6 py-4">Student Name</th>
                       <th className="px-6 py-4">Adm. No.</th>
                       <th className="px-6 py-4">Class</th>
                       <th className="px-6 py-4">Issue Date</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50 text-sm">
                    {isLoading ? (
                      <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400 font-medium">Loading TCs...</td></tr>
                    ) : filteredItems.length === 0 ? (
                      <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400 font-medium italic">No TC records found.</td></tr>
                    ) : filteredItems.map((tc) => (
                       <tr key={tc.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-[#3B2565]">{tc.tc_number}</td>
                          <td className="px-6 py-4 font-semibold text-gray-800">{tc.student_name}</td>
                          <td className="px-6 py-4 text-gray-500 font-medium">{tc.admission_number}</td>
                          <td className="px-6 py-4 text-gray-500 font-medium">{tc.class_at_leaving}</td>
                          <td className="px-6 py-4 text-gray-500 font-medium">{new Date(tc.date_of_leaving).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                             <button
                               onClick={() => toggleVerify(tc)}
                               className={cn(
                                "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight transition-all",
                                tc.is_verified ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                             )}>
                                {tc.is_verified ? "Verified" : "Unverified"}
                             </button>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex justify-center gap-2">
                                <button onClick={() => { setEditingItem(tc); setIsEditorOpen(true); }} title="Edit Record" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18} /></button>
                                <button onClick={() => handleDelete(tc.id)} title="Delete" className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </CardContent>
      </Card>

      {/* Side Editor */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsEditorOpen(false)} />
          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-10">
              <h3 className="text-xl font-bold text-[#3B2565]">
                {editingItem?.id ? "Edit TC Record" : "Issue New TC"}
              </h3>
              <button 
                onClick={() => setIsEditorOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors font-black"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">TC Number</label>
                  <Input 
                    required
                    value={editingItem?.tc_number || ""} 
                    onChange={(e) => setEditingItem({...editingItem!, tc_number: e.target.value})}
                    placeholder="e.g. TC/2024/001"
                    className="h-11 border-gray-200 font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Admission No.</label>
                  <Input 
                    value={editingItem?.admission_number || ""} 
                    onChange={(e) => setEditingItem({...editingItem!, admission_number: e.target.value})}
                    placeholder="ADM-XXXX"
                    className="h-11 border-gray-200" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Student Full Name</label>
                <Input 
                  required
                  value={editingItem?.student_name || ""} 
                  onChange={(e) => setEditingItem({...editingItem!, student_name: e.target.value})}
                  className="h-11 border-gray-200 font-bold" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Father's Name</label>
                <Input 
                  required
                  value={editingItem?.father_name || ""} 
                  onChange={(e) => setEditingItem({...editingItem!, father_name: e.target.value})}
                  className="h-11 border-gray-200" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Class at Leaving</label>
                  <Input 
                    required
                    value={editingItem?.class_at_leaving || ""} 
                    onChange={(e) => setEditingItem({...editingItem!, class_at_leaving: e.target.value})}
                    className="h-11 border-gray-200" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date of Leaving</label>
                  <Input 
                    required
                    type="date"
                    value={editingItem?.date_of_leaving || ""} 
                    onChange={(e) => setEditingItem({...editingItem!, date_of_leaving: e.target.value})}
                    className="h-11 border-gray-200" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Conduct Remark</label>
                <Input 
                  value={editingItem?.conduct || ""} 
                  onChange={(e) => setEditingItem({...editingItem!, conduct: e.target.value})}
                  className="h-11 border-gray-200" 
                />
              </div>

              <div className="pt-4 flex gap-4">
                <Button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex-1 bg-[#3B2565] hover:bg-[#2A1a4a] text-white h-12 font-bold uppercase tracking-widest"
                >
                  {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="mr-2" size={18} />}
                  Save Record
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsEditorOpen(false)} className="px-8 h-12">Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatSmall({ icon: Icon, label, value, color, bg }: { icon: React.ElementType; label: string; value: string; color: string; bg: string }) {
   return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
         <div className={cn("p-4 rounded-xl", bg)}>
            <Icon className={cn("h-6 w-6 font-black", color)} />
         </div>
         <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</p>
            <p className="text-2xl font-black text-gray-800 tracking-tight">{value}</p>
         </div>
      </div>
   )
}


