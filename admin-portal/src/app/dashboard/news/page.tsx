"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Calendar as CalendarIcon, MapPin, Edit2, Trash2, Eye, ExternalLink, Clock, Newspaper, Image, FileText, Loader2, X, Save, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { NewsEvent } from "@/types/database";

export default function NewsEventsManagement() {
  const [items, setItems] = useState<NewsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<NewsEvent> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/news");
      const { data } = await res.json();
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await fetch(`/api/news/${id}`, { method: "DELETE" });
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title) return;
    
    setIsSaving(true);
    try {
      const method = editingItem.id ? "PUT" : "POST";
      const url = editingItem.id ? `/api/news/${editingItem.id}` : "/api/news";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      if (res.ok) {
        fetchNews();
        setIsEditorOpen(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error("Error saving news:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const openEditor = (item: Partial<NewsEvent> | null = null) => {
    setEditingItem(item || {
      title: "",
      category: "Announcement",
      status: "draft",
      content: "",
      event_date: new Date().toISOString().split('T')[0],
      event_location: "Main Campus"
    });
    setIsEditorOpen(true);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3B2565]">News & Events</h2>
          <p className="text-gray-500 mt-1 font-medium">Publish and manage school announcements, news, and upcoming events.</p>
        </div>
        <Button 
          onClick={() => openEditor()}
          className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white flex gap-2 shadow-lg shadow-[#3B2565]/20"
        >
          <Plus size={18} />
          Create New Post
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
         {/* List Section */}
         <div className="flex-1 space-y-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
               <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search news/events..." 
                    className="pl-10 h-10 border-gray-100 rounded-xl" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <div className="flex gap-2 w-full md:w-auto">
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="flex-1 md:w-40 h-10 px-3 rounded-xl border border-gray-100 bg-gray-50 text-sm font-bold text-gray-600 outline-none"
                  >
                     <option value="All">All Categories</option>
                     <option value="Event">Event</option>
                     <option value="Academic">Academic</option>
                     <option value="Announcement">Announcement</option>
                     <option value="Workshop">Workshop</option>
                  </select>
               </div>
            </div>

            <div className="space-y-4">
               {isLoading ? (
                  <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100">
                    <Loader2 className="h-8 w-8 text-[#3B2565] animate-spin mb-4" />
                    <p className="text-gray-500 font-medium">Loading news...</p>
                  </div>
               ) : filteredItems.length === 0 ? (
                  <div className="text-center p-12 bg-white rounded-2xl border border-gray-100 italic text-gray-400">
                    No items found matching your filters.
                  </div>
               ) : filteredItems.map((item) => (
                  <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                           <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600 hidden md:block">
                              <CalendarIcon size={24} strokeWidth={2.5} />
                           </div>
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                 <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">{item.category}</span>
                                 <span className={cn(
                                    "text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider",
                                    item.status === "published" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                                 )}>{item.status}</span>
                              </div>
                              <h3 className="text-lg font-bold text-[#3B2565] transition-colors">{item.title}</h3>
                              <div className="flex items-center gap-4 mt-1">
                                 <p className="text-xs text-gray-400 flex items-center gap-1 font-bold">
                                    <Clock size={12} /> {item.event_date || item.created_at.split('T')[0]}
                                 </p>
                                 <p className="text-xs text-gray-400 flex items-center gap-1 font-bold">
                                    <MapPin size={12} /> {item.event_location || "Main Campus"}
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div className="flex md:flex-col lg:flex-row gap-2 self-end md:self-center">
                           <button onClick={() => openEditor(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={18} /></button>
                           <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={18} /></button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Info Sidebar */}
         <div className="w-full lg:w-80 space-y-6">
            <Card className="shadow-sm border-gray-100">
               <CardHeader className="bg-[#3B2565] text-white rounded-t-lg p-5">
                  <CardTitle className="text-base font-bold">Post Quick Tips</CardTitle>
               </CardHeader>
               <CardContent className="p-5 space-y-4">
                  <Tip icon={Image} text="Always include a high-quality featured image for events." />
                  <Tip icon={ExternalLink} text="You can link events directly to registration forms." />
                  <Tip icon={FileText} text="Use clear, concise titles for better SEO results." />
               </CardContent>
            </Card>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-2">Announcement Bar</h3>
                  <p className="text-xs text-white/70 leading-relaxed mb-4">
                     Update the scrolling marquee text displayed at the top of the website home page.
                  </p>
                  <textarea 
                     className="w-full h-20 bg-white/10 border border-white/20 rounded-xl p-3 text-xs focus:bg-white/20 outline-none transition-all placeholder:text-white/40 mb-3"
                     placeholder="Enter urgent announcement text here..."
                  />
                  <Button className="w-full bg-white text-[#3B2565] hover:bg-gray-100 font-bold h-10">
                     Update Marquee
                  </Button>
               </div>
               <div className="absolute -bottom-4 -right-4 opacity-10">
                  <Newspaper size={100} />
               </div>
            </div>
         </div>
      </div>

      {/* Side Panel Editor */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsEditorOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="bg-[#3B2565] p-2 rounded-lg text-white">
                  {editingItem?.id ? <Edit2 size={20} /> : <Plus size={20} />}
                </div>
                <h3 className="text-xl font-bold text-[#3B2565]">
                  {editingItem?.id ? "Edit News Post" : "Create News Post"}
                </h3>
              </div>
              <button 
                onClick={() => setIsEditorOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title</label>
                <Input 
                  required
                  value={editingItem?.title || ""} 
                  onChange={(e) => setEditingItem({...editingItem!, title: e.target.value})}
                  placeholder="Enter a compelling title..."
                  className="h-12 text-lg font-bold border-gray-200 focus:border-[#3B2565] focus:ring-1 focus:ring-[#3B2565]" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={editingItem?.category || "Announcement"}
                    onChange={(e) => setEditingItem({...editingItem!, category: e.target.value})}
                    className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm font-bold text-gray-600 outline-none focus:bg-white focus:border-[#3B2565]"
                  >
                    <option value="Event">Event</option>
                    <option value="Academic">Academic</option>
                    <option value="Announcement">Announcement</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
                  <select 
                    value={editingItem?.status || "draft"}
                    onChange={(e) => setEditingItem({...editingItem!, status: e.target.value as any})}
                    className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm font-bold text-gray-600 outline-none focus:bg-white focus:border-[#3B2565]"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Event Date</label>
                  <Input 
                    type="date"
                    value={editingItem?.event_date || ""} 
                    onChange={(e) => setEditingItem({...editingItem!, event_date: e.target.value})}
                    className="h-11 border-gray-200" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Location</label>
                  <Input 
                    value={editingItem?.event_location || ""} 
                    onChange={(e) => setEditingItem({...editingItem!, event_location: e.target.value})}
                    placeholder="e.g. Auditorium"
                    className="h-11 border-gray-200" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Featured Image URL</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input 
                      value={editingItem?.featured_image || ""}
                      onChange={(e) => setEditingItem({...editingItem!, featured_image: e.target.value})}
                      placeholder="https://images.unsplash.com/..."
                      className="h-11 border-gray-200"
                    />
                  </div>
                  {editingItem?.featured_image && (
                    <div className="w-11 h-11 rounded-lg overflow-hidden border border-gray-200">
                      <img src={editingItem.featured_image} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Excerpt (Short Summary)</label>
                <textarea 
                  className="w-full h-20 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600 outline-none focus:bg-white focus:border-[#3B2565] transition-all"
                  value={editingItem?.excerpt || ""}
                  onChange={(e) => setEditingItem({...editingItem!, excerpt: e.target.value})}
                  placeholder="Provide a brief summary for list views..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Content (Markdown/HTML supported)</label>
                <textarea 
                  required
                  className="w-full h-64 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600 outline-none focus:bg-white focus:border-[#3B2565] transition-all"
                  value={editingItem?.content || ""}
                  onChange={(e) => setEditingItem({...editingItem!, content: e.target.value})}
                  placeholder="Write the full story here..."
                />
              </div>

              <div className="pt-4 flex gap-4 sticky bottom-0 bg-white py-6 border-t border-gray-100">
                <Button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex-1 bg-[#3B2565] hover:bg-[#2A1a4a] text-white h-12 font-bold uppercase tracking-widest shadow-xl shadow-[#3B2565]/20"
                >
                  {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="mr-2" size={18} />}
                  Save Changes
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditorOpen(false)}
                  className="px-8 h-12 border-gray-200 text-gray-400 font-bold"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Tip({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
   return (
      <div className="flex gap-3 items-start">
         <div className="mt-1"><Icon size={14} className="text-indigo-500" /></div>
         <p className="text-xs text-gray-500 font-medium leading-relaxed">{text}</p>
      </div>
   )
}
