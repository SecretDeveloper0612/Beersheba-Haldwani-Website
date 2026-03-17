"use client";

import React, { useState, useEffect } from "react";
import { Upload, Search, Image as ImageIcon, Video, FileText, Trash2, Download, Copy, Grid, List, Loader2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MediaFile } from "@/types/database";

const mediaTypes = ["All", "image", "video", "document"];

const typeIcon: Record<string, React.ElementType> = {
  image: ImageIcon,
  video: Video,
  document: FileText,
};

export default function MediaLibrary() {
  const [activeType, setActiveType] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMedia();
  }, [activeType]);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const typeParam = activeType !== "All" ? `?type=${activeType}` : "";
      const res = await fetch(`/api/media${typeParam}`);
      const { data } = await res.json();
      setMedia(data || []);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Note: This still uses /api/upload for actual upload logic if it exists, 
      // but we should probably ensure /api/upload also works with Hygraph if that's the goal.
      // For now, let's keep the fetch but refresh media after.
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        fetchMedia();
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const filtered = media.filter((f: any) => 
    (f.fileName || f.file_name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3B2565]">Media Library</h2>
          <p className="text-gray-500 mt-1 font-medium">All uploaded images, videos, and documents in one place.</p>
        </div>
        <div className="flex gap-3">
          <label className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white flex items-center gap-2 shadow-lg h-11 px-8 rounded-full cursor-pointer transition-all active:scale-95">
            {isUploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
            <span className="font-bold">{isUploading ? "Uploading..." : "Upload Files"}</span>
            <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
          </label>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {mediaTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-black whitespace-nowrap uppercase tracking-widest transition-all",
                activeType === type ? "bg-[#3B2565] text-white shadow-md" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              )}
            >
              {type === "image" ? "Images" : type === "video" ? "Videos" : type === "document" ? "Docs" : "All Files"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search files..." 
              className="pl-10 h-10 border-gray-100 rounded-xl" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={cn("p-2 border-r border-gray-100 transition-colors", viewMode === "grid" ? "bg-[#3B2565] text-white" : "bg-white text-gray-400 hover:bg-gray-50")}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn("p-2 transition-colors", viewMode === "list" ? "bg-[#3B2565] text-white" : "bg-white text-gray-400 hover:bg-gray-50")}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center text-gray-400">
           <Loader2 size={48} className="animate-spin mb-4" />
           <p className="font-bold">Accessing library storage...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200 text-gray-400 font-bold italic">
           No media files found in this category.
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filtered.map((file: any) => {
            const url = file.url || file.file_url;
            const fileName = file.fileName || file.file_name;
            const mimeType = file.mimeType || file.mime_type || "";
            const isImage = mimeType.startsWith("image/") || (file.file_type === "image");
            const isVideo = mimeType.startsWith("video/") || (file.file_type === "video");
            const Icon = isImage ? ImageIcon : isVideo ? Video : FileText;
            
            return (
              <div key={file.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl hover:border-indigo-100 transition-all">
                <div className={cn(
                  "aspect-square flex items-center justify-center relative",
                  isImage ? "bg-gray-50" : isVideo ? "bg-gray-900" : "bg-indigo-50"
                )}>
                   {isImage ? (
                     <img src={url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                   ) : (
                    <Icon size={48} className={cn(
                      "opacity-30",
                      isVideo ? "text-white" : "text-indigo-400"
                    )} strokeWidth={1} />
                   )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(url);
                        alert("URL copied!");
                      }}
                      className="p-2.5 bg-white/90 rounded-xl text-gray-700 hover:text-indigo-600 transition-colors shadow-sm"
                    ><Copy size={16} /></button>
                     <a href={url} target="_blank" className="p-2.5 bg-white/90 rounded-xl text-gray-700 hover:text-blue-600 transition-colors shadow-sm"><Download size={16} /></a>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-gray-800 truncate" title={fileName}>{fileName}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{((file.size || file.file_size || 0) / 1024 / 1024).toFixed(1)} MB</p>
                    {file.width && file.height && (
                      <p className="text-[10px] text-indigo-500 font-black">{file.width}x{file.height}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-5 text-[10px] font-black text-gray-400 uppercase tracking-widest px-6 py-4 bg-gray-50 border-b border-gray-50">
            <span className="col-span-2">File Name</span>
            <span>Type</span>
            <span>Size</span>
            <span>Dimensions / Used</span>
          </div>
          {filtered.map((file: any) => {
            const url = file.url || file.file_url;
            const fileName = file.fileName || file.file_name;
            const mimeType = file.mimeType || file.mime_type || "";
            const isImage = mimeType.startsWith("image/") || (file.file_type === "image");
            const isVideo = mimeType.startsWith("video/") || (file.file_type === "video");
            const Icon = isImage ? ImageIcon : isVideo ? Video : FileText;

            return (
              <div key={file.id} className="grid grid-cols-5 items-center px-6 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                <div className="col-span-2 flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-[#3B2565]/10 transition-colors">
                    <Icon size={16} className="text-gray-500 group-hover:text-[#3B2565] transition-colors" />
                  </div>
                  <p className="text-sm font-bold text-gray-800 truncate">{fileName}</p>
                </div>
                <span className="text-xs font-bold text-gray-500 capitalize">{mimeType.split('/')[1] || file.file_type}</span>
                <span className="text-xs text-gray-500 font-medium">{((file.size || file.file_size || 0) / 1024 / 1024).toFixed(1)} MB</span>
                <div className="flex items-center justify-between">
                  {file.width ? (
                    <span className="text-xs font-black text-indigo-500">{file.width}x{file.height}</span>
                  ) : (
                    <span className="text-xs font-black text-indigo-500">{file.used_count || 0}x</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 font-bold">Showing {filtered.length} of {media.length} files</p>
      </div>
    </div>
  );
}
