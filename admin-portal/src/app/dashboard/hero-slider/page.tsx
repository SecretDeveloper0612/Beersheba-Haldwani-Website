"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save, Loader2, X, Image as ImageIcon, Link as LinkIcon, MoveUp, MoveDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MediaSelector } from "@/components/media-selector";

export default function HeroSliderManagement() {
  const [slides, setSlides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/hero-slider");
      const { data } = await res.json();
      setSlides(data || []);
    } catch (error) {
      console.error("Error fetching slides:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this slide from the homepage?")) return;
    try {
      await fetch(`/api/hero-slider/${id}`, { method: "DELETE" });
      setSlides(slides.filter(s => s.id !== id));
    } catch (error) {
      console.error("Error deleting slide:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = editingSlide.id ? `/api/hero-slider/${editingSlide.id}` : "/api/hero-slider";
      const method = editingSlide.id ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSlide),
      });

      if (res.ok) {
        fetchSlides();
        setIsEditorOpen(false);
        setEditingSlide(null);
      }
    } catch (error) {
      console.error("Error saving slide:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const openEditor = (slide: any = null) => {
    setEditingSlide(slide || {
      title: "",
      description: "",
      buttonText: "Learn More",
      buttonLink: "/about",
      slideOrder: slides.length + 1,
      imageUrl: ""
    });
    setIsEditorOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3B2565]">Hero Slider</h2>
          <p className="text-gray-500 mt-1 font-medium">Manage the main carousel slides on the website homepage.</p>
        </div>
        <Button 
          onClick={() => openEditor()}
          className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white flex gap-2 shadow-lg h-11"
        >
          <Plus size={18} />
          Add New Slide
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <Loader2 className="h-10 w-10 text-[#3B2565] animate-spin mb-4" />
          <p className="text-gray-500 font-bold">Loading slides...</p>
        </div>
      ) : slides.length === 0 ? (
        <div className="text-center p-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <ImageIcon size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-400 font-bold text-lg">No slides found</p>
          <Button variant="link" onClick={() => openEditor()} className="text-[#3B2565] font-black underline mt-2">Create your first slide</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {slides.map((slide) => (
            <Card key={slide.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-3xl">
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                <img 
                  src={slide.image?.url || slide.imageUrl} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt={slide.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#3B2565] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    Order: {slide.slideOrder}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-black text-xl mb-1 line-clamp-1">{slide.title}</h3>
                  <p className="text-white/70 text-xs line-clamp-1">{slide.description}</p>
                </div>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditor(slide)} className="p-2 bg-white/90 backdrop-blur-sm rounded-xl text-[#3B2565] hover:bg-white shadow-sm transition-all"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(slide.id)} className="p-2 bg-red-500/90 backdrop-blur-sm rounded-xl text-white hover:bg-red-500 shadow-sm transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
              <CardContent className="p-6 flex items-center justify-between border-t border-gray-50">
                 <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                       <button className="p-1 text-gray-400 hover:text-[#3B2565] transition-colors"><MoveUp size={14} /></button>
                       <button className="p-1 text-gray-400 hover:text-[#3B2565] transition-colors"><MoveDown size={14} /></button>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">Action Button</p>
                       <p className="text-sm font-bold text-[#3B2565]">{slide.buttonText || "None"}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">Link Path</p>
                    <p className="text-sm font-bold text-gray-500">{slide.buttonLink || "/"}</p>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEditorOpen(false)} />
          <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="bg-[#3B2565] p-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="bg-white/10 p-2 rounded-xl"><ImageIcon size={20} /></div>
                   <h3 className="text-xl font-bold">{editingSlide?.id ? "Edit Slide" : "Create New Slide"}</h3>
                </div>
                <button onClick={() => setIsEditorOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
             </div>

             <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2 col-span-full md:col-span-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Slide Title</label>
                      <Input 
                        required
                        value={editingSlide?.title || ""} 
                        onChange={(e) => setEditingSlide({...editingSlide, title: e.target.value})}
                        placeholder="Welcome to Beersheba..."
                        className="h-12 font-bold rounded-xl border-gray-100" 
                      />
                   </div>
                   <div className="space-y-2 col-span-full md:col-span-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sort Order</label>
                      <Input 
                        type="number"
                        value={editingSlide?.slideOrder || ""} 
                        onChange={(e) => setEditingSlide({...editingSlide, slideOrder: e.target.value})}
                        className="h-12 font-bold rounded-xl border-gray-100" 
                      />
                   </div>
                   <div className="space-y-2 col-span-full">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                      <textarea 
                        className="w-full h-24 bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm outline-none focus:ring-2 ring-[#3B2565]/10"
                        value={editingSlide?.description || ""}
                        onChange={(e) => setEditingSlide({...editingSlide, description: e.target.value})}
                        placeholder="Enter sub-text for the slide..."
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Button Text</label>
                      <Input 
                        value={editingSlide?.buttonText || ""} 
                        onChange={(e) => setEditingSlide({...editingSlide, buttonText: e.target.value})}
                        placeholder="e.g. Apply Now"
                        className="h-12 rounded-xl border-gray-100" 
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Button Link</label>
                      <div className="relative">
                         <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                         <Input 
                           value={editingSlide?.buttonLink || ""} 
                           onChange={(e) => setEditingSlide({...editingSlide, buttonLink: e.target.value})}
                           placeholder="/admissions"
                           className="h-12 pl-10 rounded-xl border-gray-100" 
                         />
                      </div>
                   </div>
                   <div className="space-y-4 col-span-full">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Slide Image</label>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsMediaSelectorOpen(true)}
                          className="h-9 px-4 text-xs font-bold border-dashed border-gray-300 hover:border-[#3B2565] flex gap-2"
                        >
                          <ImageIcon size={14} />
                          Browse Library
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                           <Input 
                            required
                            value={editingSlide?.imageUrl || editingSlide?.image?.url || ""} 
                            onChange={(e) => setEditingSlide({...editingSlide, imageUrl: e.target.value})}
                            placeholder="Select image or enter URL..."
                            className="h-12 rounded-xl border-gray-100" 
                          />
                        </div>
                        <div className="aspect-video md:aspect-auto h-32 md:h-12 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                           {(editingSlide?.imageUrl || editingSlide?.image?.url) ? (
                             <img src={editingSlide.imageUrl || editingSlide.image?.url} className="w-full h-full object-cover" />
                           ) : (
                             <ImageIcon className="text-gray-200" size={24} />
                           )}
                        </div>
                      </div>
                   </div>

      {/* Media Selector Overlay */}
      {isMediaSelectorOpen && (
        <MediaSelector 
          onSelect={(url: string) => {
            setEditingSlide({...editingSlide, imageUrl: url, image: { url }});
          }}
          onClose={() => setIsMediaSelectorOpen(false)}
          currentUrl={editingSlide?.imageUrl || editingSlide?.image?.url}
        />
      )}
                </div>

                <div className="pt-4 sticky bottom-0 bg-white pb-2 flex gap-4">
                  <Button 
                    type="submit" 
                    disabled={isSaving}
                    className="flex-1 bg-[#3B2565] hover:bg-[#2A1a4a] text-white h-14 font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-[#3B2565]/20"
                  >
                    {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
                    Save Slide
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setIsEditorOpen(false)}
                    className="px-8 h-14 text-gray-400 font-bold"
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
