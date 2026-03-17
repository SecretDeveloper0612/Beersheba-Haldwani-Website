"use client";

import React, { useState, useEffect } from "react";
import { Search, Image as ImageIcon, X, Loader2, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MediaSelectorProps {
  onSelect: (url: string) => void;
  onClose: () => void;
  currentUrl?: string;
}

export function MediaSelector({ onSelect, onClose, currentUrl }: MediaSelectorProps) {
  const [media, setMedia] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/media");
      const { data } = await res.json();
      setMedia(data || []);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = media.filter((file) => 
    (file.fileName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="bg-[#3B2565] p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-xl"><ImageIcon size={20} /></div>
            <h3 className="text-xl font-bold">Select Media Assets</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
        </div>

        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search library..." 
              className="pl-10 h-10 border-gray-200 rounded-xl bg-white" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
            {filtered.length} Assets Found
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <Loader2 className="h-10 w-10 animate-spin mb-4" />
              <p className="font-bold">Accessing Hygraph Assets...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="h-full flex items-center justify-center italic text-gray-400 font-bold border-2 border-dashed border-gray-100 rounded-3xl">
              No matching assets found.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map((file) => {
                const isSelected = currentUrl === file.url;
                const isImage = file.mimeType?.startsWith("image/");
                
                return (
                  <div 
                    key={file.id} 
                    onClick={() => onSelect(file.url)}
                    className={cn(
                      "relative aspect-square rounded-2xl border-2 transition-all cursor-pointer group overflow-hidden",
                      isSelected ? "border-[#3B2565] ring-4 ring-[#3B2565]/10 shadow-lg" : "border-gray-100 hover:border-indigo-200 hover:shadow-md"
                    )}
                  >
                    {isImage ? (
                      <img src={file.url} className="w-full h-full object-cover" alt={file.fileName} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                        <ImageIcon size={32} />
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-[#3B2565]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="bg-white p-2 rounded-full shadow-lg">
                          <Check className="text-[#3B2565]" size={20} strokeWidth={3} />
                       </div>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-[#3B2565] text-white p-1 rounded-full shadow-md z-10">
                        <Check size={12} strokeWidth={4} />
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-[10px] text-white font-bold truncate">{file.fileName}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
           <Button variant="ghost" onClick={onClose} className="font-bold text-gray-400">Cancel</Button>
           <Button onClick={onClose} className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white font-bold rounded-xl px-10">Done</Button>
        </div>
      </div>
    </div>
  );
}
