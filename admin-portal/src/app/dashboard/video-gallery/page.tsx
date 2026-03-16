"use client";

import React, { useState, useEffect } from "react";
import { Plus, Video, Search, Play, Edit2, Trash2, Globe, Youtube, ExternalLink, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoItem } from "@/types/database";
import { cn } from "@/lib/utils";

export default function VideoGalleryManagement() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/video-gallery");
      const { data } = await res.json();
      setVideos(data || []);
      if (data?.length > 0) setSelectedVideo(data[0]);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVideo) return;
    setIsSaving(true);
    try {
      const method = selectedVideo.id ? "PUT" : "POST";
      const url = selectedVideo.id ? `/api/video-gallery/${selectedVideo.id}` : "/api/video-gallery";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedVideo),
      });
      if (res.ok) {
        fetchVideos();
      }
    } catch (error) {
      console.error("Error saving video:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3B2565]">Video Gallery</h2>
          <p className="text-gray-500 mt-1 font-medium">Manage video links and embedded content for the gallery.</p>
        </div>
        <Button className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white flex gap-2 shadow-lg h-11 px-8 rounded-full">
          <Plus size={18} />
          Add Video Link
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Video List */}
         <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                   <Input 
                      placeholder="Search videos by title..." 
                      className="pl-10 h-10 border-gray-100 rounded-xl"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-10 w-10 text-gray-400"><Youtube size={20} /></Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 text-gray-400"><Globe size={20} /></Button>
               </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                   <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 italic text-gray-400">
                      <Loader2 className="h-8 w-8 text-[#3B2565] animate-spin mb-4" />
                      Loading videos...
                   </div>
                ) : filteredVideos.length === 0 ? (
                   <div className="col-span-full text-center p-12 bg-white rounded-2xl border border-gray-100 italic text-gray-400">
                      No videos found.
                   </div>
                ) : filteredVideos.map((video) => (
                   <div 
                      key={video.id} 
                      onClick={() => setSelectedVideo(video)}
                      className={cn(
                        "bg-white rounded-2xl shadow-sm border overflow-hidden group hover:shadow-xl transition-all cursor-pointer",
                        selectedVideo?.id === video.id ? "border-[#3B2565] ring-2 ring-[#3B2565]/10" : "border-gray-100 hover:border-indigo-100"
                      )}
                   >
                      <div className="aspect-video bg-gray-900 relative flex items-center justify-center group-hover:bg-black transition-colors">
                         <div className="absolute inset-0 opacity-40 bg-gradient-to-t from-black to-transparent" />
                         <div className="z-10 bg-white/20 backdrop-blur-md p-4 rounded-full text-white transform group-hover:scale-110 transition-transform cursor-pointer shadow-2xl border border-white/20">
                            <Play size={32} fill="white" />
                         </div>
                         <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10">
                            {video.source === "YouTube" ? <Youtube size={14} className="text-red-500" /> : <Globe size={14} className="text-blue-500" />}
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{video.source}</span>
                         </div>
                         <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10">
                            <span className="text-[10px] font-black text-white">{video.duration || "N/A"}</span>
                         </div>
                      </div>
                      <div className="p-5">
                          <h3 className="font-black text-[#3B2565] text-lg mb-1 truncate">{video.title}</h3>
                          <p className="text-xs text-gray-400 font-bold mb-4">{video.created_at ? new Date(video.created_at).toLocaleDateString() : "Unknown date"}</p>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                             <div className="flex gap-3">
                                <button className="text-indigo-600 hover:text-indigo-800 transition-colors"><Edit2 size={16} /></button>
                                <button className="text-red-500 hover:text-red-700 transition-colors"><Trash2 size={16} /></button>
                             </div>
                             <a 
                                href={video.video_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[10px] font-black text-gray-400 hover:text-[#3B2565] flex items-center gap-1 uppercase tracking-widest transition-colors"
                             >
                                Open Link <ExternalLink size={12} />
                             </a>
                          </div>
                      </div>
                   </div>
                ))}
             </div>
         </div>

         {/* Add/Edit Form */}
         <div className="relative">
            {selectedVideo ? (
               <Card className="shadow-2xl border-none sticky top-8">
                  <CardHeader className="bg-gray-50 border-b border-gray-100 rounded-t-2xl p-6">
                     <CardTitle className="text-lg text-[#3B2565] font-black uppercase tracking-tight flex items-center gap-2">
                        <Video className="text-indigo-600" />
                        {selectedVideo.id ? "Edit Video" : "Add Video"}
                     </CardTitle>
                  </CardHeader>
                  <form onSubmit={handleSave}>
                     <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                           <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Video Title</label>
                           <Input 
                              value={selectedVideo.title} 
                              onChange={(e) => setSelectedVideo({...selectedVideo, title: e.target.value})}
                              placeholder="Enter video title..." 
                              className="h-11 font-bold border-gray-100" 
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Embedded Link / URL</label>
                           <div className="relative">
                              <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input 
                                 value={selectedVideo.video_url} 
                                 onChange={(e) => setSelectedVideo({...selectedVideo, video_url: e.target.value})}
                                 placeholder="https://youtube.com/watch?v=..." 
                                 className="pl-10 h-11 border-gray-100 font-medium" 
                              />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Source</label>
                              <select 
                                 value={selectedVideo.source} 
                                 onChange={(e) => setSelectedVideo({...selectedVideo, source: e.target.value as any})}
                                 className="w-full h-11 px-3 rounded-md border border-gray-100 bg-gray-50 text-sm font-bold text-gray-600 outline-none"
                              >
                                 <option value="YouTube">YouTube</option>
                                 <option value="Vimeo">Vimeo</option>
                                 <option value="Other">Other</option>
                              </select>
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Duration</label>
                              <Input 
                                 value={selectedVideo.duration || ""} 
                                 onChange={(e) => setSelectedVideo({...selectedVideo, duration: e.target.value})}
                                 placeholder="MM:SS" 
                                 className="h-11 text-center font-bold" 
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Thumbnail Preview</label>
                           <div className="aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-300 gap-2 overflow-hidden">
                              {selectedVideo.video_url ? (
                                 <div className="text-center p-4">
                                    <Play size={24} className="mx-auto mb-2 opacity-20" />
                                    <p className="text-[10px] font-black uppercase tracking-widest truncate max-w-[200px]">{selectedVideo.video_url}</p>
                                 </div>
                              ) : (
                                 <>
                                    <ImageIcon size={32} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Auto-fetched from URL</p>
                                 </>
                              )}
                           </div>
                        </div>

                        <Button 
                           type="submit" 
                           disabled={isSaving}
                           className="w-full bg-[#3B2565] hover:bg-[#2A1a4a] text-white font-black uppercase tracking-widest h-12 shadow-xl shadow-[#3B2565]/20 mt-4"
                        >
                           {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="mr-2" size={18} />}
                           {selectedVideo.id ? "Update Video Record" : "Save Video Record"}
                        </Button>
                     </CardContent>
                  </form>
               </Card>
            ) : (
               <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 h-[500px] flex flex-col items-center justify-center text-gray-400 p-8 text-center sticky top-8">
                  <Video size={64} className="mb-4 opacity-20" />
                  <p className="font-bold text-lg">Select a video to edit</p>
                  <p className="text-sm">Choose from the list to modify, or add a new record.</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}

