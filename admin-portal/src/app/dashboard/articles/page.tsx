"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Image as ImageIcon, Loader2, X, Save, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MediaSelector } from "@/components/media-selector";

export default function ArticlesManagement() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/articles");
      const { data } = await res.json();
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      await fetch(`/api/articles/${id}`, { method: "DELETE" });
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
      const url = editingItem.id ? `/api/articles/${editingItem.id}` : "/api/articles";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      if (res.ok) {
        fetchArticles();
        setIsEditorOpen(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error("Error saving article:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const openEditor = (item: any | null = null) => {
    setEditingItem(item || {
      title: "",
      slug: "",
      shortDesc: "",
      content: "",
      mainImageUrl: ""
    });
    setIsEditorOpen(true);
  };

  const filteredItems = items.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3B2565]">Articles & Blogs</h2>
          <p className="text-gray-500 mt-1 font-medium">Manage educational articles, blogs, and school stories.</p>
        </div>
        <Button 
          onClick={() => openEditor()}
          className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white flex gap-2 shadow-lg shadow-[#3B2565]/20"
        >
          <Plus size={18} />
          Write New Article
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search articles..." 
              className="pl-10 h-10 border-gray-100 rounded-xl" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {isLoading ? (
            <div className="col-span-full flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <Loader2 className="h-10 w-10 text-[#3B2565] animate-spin mb-4" />
              <p className="text-gray-500 font-bold">Loading articles library...</p>
            </div>
         ) : filteredItems.length === 0 ? (
            <div className="col-span-full text-center p-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <FileText size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-400 font-bold text-lg">No articles found</p>
              <Button variant="link" onClick={() => openEditor()} className="text-[#3B2565] font-black underline mt-2">Write your first story</Button>
            </div>
         ) : filteredItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-3xl">
               <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img 
                    src={item.mainImage?.url || item.mainImageUrl || "/assets/image/placeholder.jpg"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={item.title}
                  />
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditor(item)} className="p-2 bg-white/90 backdrop-blur-sm rounded-xl text-[#3B2565] hover:bg-white shadow-sm transition-all"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/90 backdrop-blur-sm rounded-xl text-white hover:bg-red-500 shadow-sm transition-all"><Trash2 size={16} /></button>
                  </div>
               </div>
               <CardContent className="p-6">
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">{new Date(item.createdAt).toLocaleDateString()}</p>
                  <h3 className="text-lg font-black text-[#3B2565] mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-gray-500 text-xs line-clamp-2 italic">{item.shortDesc}</p>
               </CardContent>
            </Card>
         ))}
      </div>

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEditorOpen(false)} />
          <div className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
             <div className="bg-[#3B2565] p-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="bg-white/10 p-2 rounded-xl"><FileText size={20} /></div>
                   <h3 className="text-xl font-bold">{editingItem?.id ? "Edit Article" : "Write Article"}</h3>
                </div>
                <button onClick={() => setIsEditorOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
             </div>

             <form onSubmit={handleSave} className="p-8 space-y-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2 col-span-full md:col-span-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Article Title</label>
                      <Input 
                        required
                        value={editingItem?.title || ""} 
                        onChange={(e) => setEditingItem({...editingItem!, title: e.target.value})}
                        className="h-12 font-bold rounded-xl border-gray-100" 
                      />
                   </div>
                   <div className="space-y-2 col-span-full md:col-span-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">URL Slug</label>
                      <Input 
                        required
                        value={editingItem?.slug || ""} 
                        onChange={(e) => setEditingItem({...editingItem!, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                        className="h-12 font-bold rounded-xl border-gray-100" 
                        placeholder="article-url-address"
                      />
                   </div>
                   <div className="space-y-2 col-span-full">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Featured Image</label>
                      <div className="flex gap-4">
                        <Input 
                          value={editingItem?.mainImage?.url || editingItem?.mainImageUrl || ""}
                          onChange={(e) => setEditingItem({...editingItem!, mainImageUrl: e.target.value})}
                          className="h-12 rounded-xl border-gray-100 flex-1"
                          placeholder="Image URL"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsMediaSelectorOpen(true)}
                          className="h-12 px-6 border-dashed border-gray-300 font-bold"
                        >Browse</Button>
                      </div>
                   </div>
                   <div className="space-y-2 col-span-full">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Short Description</label>
                      <textarea 
                        className="w-full h-20 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm outline-none"
                        value={editingItem?.shortDesc || ""}
                        onChange={(e) => setEditingItem({...editingItem!, shortDesc: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2 col-span-full">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Article Content (HTML supported)</label>
                      <textarea 
                        className="w-full h-80 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm outline-none focus:bg-white transition-all shadow-inner"
                        value={editingItem?.content?.html || editingItem?.content || ""}
                        onChange={(e) => setEditingItem({...editingItem!, content: e.target.value})}
                        required
                      />
                   </div>
                </div>

                <div className="pt-4 flex gap-4 sticky bottom-0 bg-white py-4 border-t border-gray-100">
                  <Button 
                    type="submit" 
                    disabled={isSaving}
                    className="flex-1 bg-[#3B2565] hover:bg-[#2A1a4a] text-white h-14 font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-[#3B2565]/20"
                  >
                    {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
                    Publish Article
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setIsEditorOpen(false)}
                    className="px-8 h-14 text-gray-400 font-bold"
                  >Cancel</Button>
                </div>
             </form>
          </div>
        </div>
      )}

      {isMediaSelectorOpen && (
        <MediaSelector 
          onSelect={(url) => setEditingItem({...editingItem!, mainImageUrl: url, mainImage: { url }})}
          onClose={() => setIsMediaSelectorOpen(false)}
          currentUrl={editingItem?.mainImage?.url || editingItem?.mainImageUrl}
        />
      )}
    </div>
  );
}
