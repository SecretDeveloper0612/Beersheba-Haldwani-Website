"use client";

import React, { useState, useEffect } from "react";
import { Save, Image as ImageIcon, Plus, Trash2, Loader2, LayoutPanelLeft } from "lucide-react";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HomepageContent, SliderImage, HomepageHighlight } from "@/types/database";

export default function HomepageManagement() {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [sliders, setSliders] = useState<SliderImage[]>([]);
  const [highlights, setHighlights] = useState<HomepageHighlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const fetchHomepageData = async () => {
    try {
      const res = await fetch("/api/homepage");
      const data = await res.json();
      setContent(data.content);
      setSliders(data.sliders);
      setHighlights(data.highlights);
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, sliders, highlights }),
      });
      if (res.ok) alert("Homepage content updated successfully!");
    } catch (error) {
      console.error("Error saving homepage content:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateContent = (field: keyof HomepageContent, value: string | boolean) => {
    setContent(prev => ({ ...prev!, [field]: value }));
  };

  const deleteSlider = async (id: string) => {
    if (!confirm("Delete this slider image?")) return;
    setSliders(sliders.filter(s => s.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20">
        <Loader2 className="h-10 w-10 text-[#3B2565] animate-spin mb-4" />
        <p className="text-gray-500 font-bold">Loading homepage content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3B2565]">Homepage Management</h2>
          <p className="text-gray-500 mt-1 font-medium">Update the content on your website&apos;s landing page.</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white flex gap-2 shadow-lg shadow-[#3B2565]/20"
        >
          {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hero Section Management */}
        <Card className="shadow-xl border-none">
          <CardHeader className="bg-gray-50 border-b border-gray-100 rounded-t-lg">
            <CardTitle className="text-xl text-[#3B2565]">Hero Section</CardTitle>
            <CardDescription>Main banner text and calls to action.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Hero Heading</label>
              <Input 
                value={content?.hero_heading || ""} 
                onChange={(e) => updateContent("hero_heading", e.target.value)}
                className="font-bold border-gray-200 h-12 text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Sub-heading Description</label>
              <textarea 
                className="w-full h-24 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm focus:bg-white focus:border-[#3B2565] outline-none transition-all shadow-inner"
                value={content?.hero_subheading || ""}
                onChange={(e) => updateContent("hero_subheading", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Primary Button</label>
                <Input 
                  value={content?.hero_primary_btn_text || ""} 
                  onChange={(e) => updateContent("hero_primary_btn_text", e.target.value)}
                  className="font-bold border-gray-100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Secondary Button</label>
                <Input 
                  value={content?.hero_secondary_btn_text || ""} 
                  onChange={(e) => updateContent("hero_secondary_btn_text", e.target.value)}
                  className="font-bold border-gray-100"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Home Slider Management */}
        <Card className="shadow-xl border-none">
          <CardHeader className="bg-gray-50 border-b border-gray-100 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-[#3B2565]">Banner Slider</CardTitle>
                <CardDescription>Upload and manage homepage slider images.</CardDescription>
              </div>
              <Button size="sm" variant="outline" className="flex gap-2 border-[#3B2565] text-[#3B2565]">
                <Plus size={16} />
                Add Image
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {sliders.map((slider) => (
                <div key={slider.id} className="flex items-center gap-4 p-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors group">
                  <div className="h-16 w-24 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-100">
                    <img src={slider.image_url} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#3B2565] truncate">{slider.caption || "No Caption"}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Order: {slider.sort_order}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      onClick={() => deleteSlider(slider.id)}
                      variant="ghost" 
                      size="icon" 
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Featured Highlights Section */}
      <Card className="shadow-xl border-none">
        <CardHeader className="bg-gray-50 border-b border-gray-100 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-[#3B2565]">Welcome Highlights</CardTitle>
              <CardDescription>The featured sections shown immediately after the hero banner.</CardDescription>
            </div>
            <Button size="sm" variant="outline" className="flex gap-2 border-indigo-600 text-indigo-600">
                <LayoutPanelLeft size={16} />
                Manage Layout
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {highlights.map((highlight) => (
                <HighlightItem 
                  key={highlight.id}
                  icon={highlight.icon} 
                  title={highlight.title} 
                  value={highlight.description || ""} 
                />
              ))}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

import type { LucideProps } from "lucide-react";
type LucideIconComponent = React.FC<LucideProps>;

function HighlightItem({ icon, title, value }: { icon: string; title: string; value: string }) {
  const IconComponent = (Icons as unknown as Record<string, LucideIconComponent | undefined>)[icon];
  return (
    <div className="p-6 rounded-3xl border border-gray-100 space-y-4 hover:shadow-xl transition-all group bg-white">
      <div className="bg-[#3B2565]/10 h-14 w-14 rounded-2xl flex items-center justify-center group-hover:bg-[#3B2565] transition-colors">
        {IconComponent && <IconComponent className="text-[#3B2565] h-8 w-8 group-hover:text-white transition-colors" />}
      </div>
      <div>
        <h4 className="font-black text-lg text-[#3B2565]">{title}</h4>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{value}</p>
      </div>
      <Button variant="link" className="p-0 h-auto text-[#3B2565] font-black text-xs uppercase tracking-widest">Edit Details</Button>
    </div>
  );
}
