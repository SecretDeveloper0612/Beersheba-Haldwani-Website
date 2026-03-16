"use client";

import React, { useState, useEffect } from "react";
import { Upload, FolderPlus, Trash2, Edit2, Search, Grid, List, MoreVertical, Image as ImageIcon, Plus, Loader2, X, Check, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GalleryAlbum, GalleryImage } from "@/types/database";

export default function GalleryManagement() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [newImage, setNewImage] = useState<Partial<GalleryImage>>({
    caption: "",
    image_url: "",
    album_id: "",
    is_active: true
  });

  const [isAddingAlbum, setIsAddingAlbum] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [newAlbum, setNewAlbum] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const { albums, images } = await res.json();
      setAlbums(albums || []);
      setImages(images || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbum.name) return;
    try {
      const res = await fetch("/api/gallery/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAlbum),
      });
      if (res.ok) {
        fetchGallery();
        setIsAddingAlbum(false);
        setNewAlbum({ name: "", description: "" });
      }
    } catch (error) {
      console.error("Error adding album:", error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.image_url || !newImage.album_id) return;
    
    setIsUploading(true);
    try {
      const res = await fetch("/api/gallery/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newImage),
      });

      if (res.ok) {
        fetchGallery();
        setIsUploading(false);
        setNewImage({ caption: "", image_url: "", album_id: "", is_active: true });
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/gallery/images/${id}`, { method: "DELETE" });
      if (res.ok) {
        setImages(images.filter(img => img.id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const filteredImages = images.filter(img => {
    const matchesAlbum = selectedAlbumId === "All" || img.album_id === selectedAlbumId;
    const matchesSearch = img.caption?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAlbum && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3B2565]">Photo Gallery</h2>
          <p className="text-gray-500 mt-1 font-medium">Upload and organize photographs for the website gallery.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setIsAddingAlbum(true)}
            variant="outline" 
            className="flex gap-2 border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            <FolderPlus size={18} />
            Create Album
          </Button>
          <Button 
            onClick={() => setIsUploadingPhoto(true)}
            className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white flex gap-2 shadow-lg shadow-[#3B2565]/20"
          >
            <Upload size={18} />
            Quick Upload
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
            <button
               onClick={() => setSelectedAlbumId("All")}
               className={cn(
                  "px-4 py-2 rounded-full text-sm font-black transition-all",
                  selectedAlbumId === "All" ? "bg-[#3B2565] text-white" : "bg-gray-100 text-gray-500"
               )}
            >All</button>
            {albums.map((album) => (
              <button
                key={album.id}
                onClick={() => setSelectedAlbumId(album.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-black whitespace-nowrap transition-all",
                  selectedAlbumId === album.id 
                    ? "bg-[#3B2565] text-white shadow-md" 
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                )}
              >
                {album.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
             <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search images..." 
                  className="pl-10 h-10 border-gray-200 rounded-xl" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
             <Loader2 size={48} className="animate-spin mb-4" />
             <p className="font-bold">Fetching gallery contents...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div key={image.id} className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                   <div className="absolute top-3 left-3 z-10">
                      <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-black text-[#3B2565] uppercase tracking-wide shadow-sm">
                         {albums.find(a => a.id === image.album_id)?.name}
                      </span>
                   </div>
                   <div className="absolute top-3 right-3 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleDelete(image.id)} className="p-2 bg-red-500/90 backdrop-blur-sm rounded-lg text-white hover:bg-red-500 shadow-sm"><Trash2 size={14} /></button>
                   </div>
                   <img src={image.image_url} alt={image.caption || ""} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = "")} />
                   {!image.image_url && (
                     <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                        <ImageIcon size={48} strokeWidth={1} />
                     </div>
                   )}
                </div>
                <div className="p-4 flex items-center justify-between">
                   <div className="truncate pr-4">
                      <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">{new Date(image.created_at).toLocaleDateString()}</p>
                      <p className="text-sm font-black text-[#3B2565] truncate">{image.caption || "Untitled"}</p>
                   </div>
                   <button className="text-gray-400 hover:text-[#3B2565] transition-colors"><MoreVertical size={20} /></button>
                </div>
              </div>
            ))}
            
            <DialogTriggerWrapper 
              albums={albums} 
              onUpload={handleUpload} 
              newImage={newImage} 
              setNewImage={setNewImage} 
              isUploading={isUploading} 
              isOpen={isUploadingPhoto}
              setIsOpen={setIsUploadingPhoto}
              onAddAlbum={() => {
                setIsUploadingPhoto(false);
                setIsAddingAlbum(true);
              }}
            />
          </div>
        )}
      </div>

      <AlbumModal 
        isOpen={isAddingAlbum} 
        onClose={() => setIsAddingAlbum(false)} 
        onSave={handleAddAlbum}
        newAlbum={newAlbum}
        setNewAlbum={setNewAlbum}
      />
    </div>
  );
}

function AlbumModal({ isOpen, onClose, onSave, newAlbum, setNewAlbum }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-[#3B2565] p-6 text-white flex justify-between items-center">
          <h3 className="text-xl font-bold">New Category/Album</h3>
          <button onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={onSave} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Album Name</label>
            <Input 
              required
              value={newAlbum.name}
              onChange={(e) => setNewAlbum({ ...newAlbum, name: e.target.value })}
              placeholder="e.g. Annual Day 2024"
              className="h-11 border-gray-100 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Short Description</label>
            <textarea 
              value={newAlbum.description}
              onChange={(e) => setNewAlbum({ ...newAlbum, description: e.target.value })}
              className="w-full h-24 bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm outline-none focus:ring-2 ring-[#3B2565]/10"
              placeholder="Optional description of the album content..."
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Quick Suggesions</label>
            <div className="flex flex-wrap gap-2">
               {["Annual Day", "Sports Meet", "Campus", "Classroom", "Faculty", "Events"].map(cat => (
                 <button 
                  key={cat}
                  type="button"
                  onClick={() => setNewAlbum({ ...newAlbum, name: cat })}
                  className="px-3 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-lg text-xs font-bold text-gray-600 transition-colors"
                 >
                   + {cat}
                 </button>
               ))}
            </div>
          </div>
          <Button type="submit" className="w-full h-12 bg-[#3B2565] text-white font-black uppercase tracking-widest rounded-xl hover:bg-[#2A1a4a] transition-all">
            Create Album
          </Button>
        </form>
      </div>
    </div>
  );
}

function DialogTriggerWrapper({ albums, onUpload, newImage, setNewImage, isUploading, isOpen, setIsOpen, onAddAlbum }: any) {
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="aspect-[4/3] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#3B2565] hover:text-[#3B2565] hover:bg-[#3B2565]/5 transition-all group"
      >
         <div className="p-3 bg-gray-50 rounded-full group-hover:bg-[#3B2565]/10 flex items-center justify-center">
            <Plus size={32} />
         </div>
         <p className="text-sm font-bold">Add Photo</p>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-[#3B2565] p-6 text-white flex justify-between items-center">
               <h3 className="text-xl font-bold">Upload to Gallery</h3>
               <button onClick={() => setIsOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={(e) => { onUpload(e); setIsOpen(false); }} className="p-8 space-y-6">
                <div className="space-y-2">
                   <div className="flex justify-between items-center px-1 mb-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Select Album</label>
                      <button 
                        type="button"
                        onClick={onAddAlbum}
                        className="text-[10px] font-black uppercase text-indigo-600 hover:text-indigo-800 font-bold"
                      >
                         + New Album
                      </button>
                   </div>
                  <select 
                    required
                    value={newImage.album_id} 
                    onChange={(e) => setNewImage({...newImage, album_id: e.target.value})}
                    className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 ring-[#3B2565]/10"
                  >
                     <option value="">Select an album...</option>
                     {albums.map((a: any) => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Image Caption</label>
                  <Input 
                    value={newImage.caption} 
                    onChange={(e) => setNewImage({...newImage, caption: e.target.value})}
                    className="h-11 border-gray-100 rounded-xl" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Image URL</label>
                  <Input 
                    required
                    value={newImage.image_url} 
                    onChange={(e) => setNewImage({...newImage, image_url: e.target.value})}
                    placeholder="https://images.unsplash.com/..."
                    className="h-11 border-gray-100 rounded-xl" 
                  />
               </div>
               <Button 
                 type="submit" 
                 disabled={isUploading}
                 className="w-full h-12 bg-[#3B2565] text-white font-black uppercase tracking-widest rounded-xl hover:bg-[#2A1a4a]"
               >
                 {isUploading ? <Loader2 className="animate-spin" /> : "Complete Upload"}
               </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


