"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function HomepageManagement() {
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const fetchHomepageData = async () => {
    try {
      const res = await fetch("/api/homepage");
      const data = await res.json();
      setContent(data.content);
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    try {
      const res = await fetch("/api/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      console.error("Error saving homepage content:", error);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  const updateContent = (field: string, value: any) => {
    setContent((prev: any) => ({ ...prev, [field]: value }));
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
          <h2 className="text-3xl font-extrabold text-[#3B2565]">Homepage Content</h2>
          <p className="text-gray-500 mt-1 font-medium">
            Manage Class X and XII Toppers sections on the website.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveStatus === "success" && (
            <span className="text-green-500 text-sm font-bold animate-in fade-in">✔ Saved successfully</span>
          )}
          {saveStatus === "error" && (
            <span className="text-red-500 text-sm font-bold animate-in fade-in">✖ Save failed</span>
          )}
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white flex gap-2 shadow-lg shadow-[#3B2565]/20 rounded-full h-11 px-6"
          >
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Publish Changes
          </Button>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-700 font-medium">
        ℹ️ <strong>Note:</strong> Only the <strong>Toppers sections</strong> are currently editable from here. Hero banners, About text, Mission/Vision, and Principal/Founder details are managed directly in your{" "}
        <a href="https://app.hygraph.com" target="_blank" rel="noopener noreferrer" className="underline font-bold">Hygraph dashboard</a>.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Class X Toppers */}
        <Card className="shadow-xl border-none">
          <CardHeader className="bg-amber-50 border-b border-amber-100 rounded-t-2xl">
            <CardTitle className="text-xl text-[#3B2565] flex items-center gap-2">
              <GraduationCap className="text-amber-600" />
              Class X Toppers
            </CardTitle>
            <CardDescription>Heading and description for the Class X toppers section.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Section Heading
              </label>
              <Input
                value={content?.class_x_heading || ""}
                onChange={(e) => updateContent("class_x_heading", e.target.value)}
                className="font-bold border-gray-100"
                placeholder="e.g. Class X Results 2024"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Section Description
              </label>
              <textarea
                className="w-full h-32 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm outline-none focus:bg-white transition-all shadow-inner"
                value={content?.class_x_desc || ""}
                onChange={(e) => updateContent("class_x_desc", e.target.value)}
                placeholder="Brief description of Class X toppers..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Class XII Toppers */}
        <Card className="shadow-xl border-none">
          <CardHeader className="bg-amber-50 border-b border-amber-100 rounded-t-2xl">
            <CardTitle className="text-xl text-[#3B2565] flex items-center gap-2">
              <GraduationCap className="text-amber-600" />
              Class XII Toppers
            </CardTitle>
            <CardDescription>Heading and description for the Class XII toppers section.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Section Heading
              </label>
              <Input
                value={content?.class_xii_heading || ""}
                onChange={(e) => updateContent("class_xii_heading", e.target.value)}
                className="font-bold border-gray-100"
                placeholder="e.g. Class XII Results 2024"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Section Description
              </label>
              <textarea
                className="w-full h-32 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm outline-none focus:bg-white transition-all shadow-inner"
                value={content?.class_xii_desc || ""}
                onChange={(e) => updateContent("class_xii_desc", e.target.value)}
                placeholder="Brief description of Class XII toppers..."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl border-none">
        <CardHeader className="bg-blue-50 border-b border-blue-100 rounded-t-2xl">
          <CardTitle className="text-xl text-[#3B2565] flex items-center gap-2">
            🎬 Hero Video Banner
          </CardTitle>
          <CardDescription>Current hero video URL (manage assets from Hygraph directly).</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 text-sm text-gray-400 italic font-medium">
            {content?.hero_video_url ? (
              <span className="text-gray-700 font-bold break-all">{content.hero_video_url}</span>
            ) : (
              "No hero video configured. Add one in Hygraph → HaldwaniHome → homeVideoBanner."
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
