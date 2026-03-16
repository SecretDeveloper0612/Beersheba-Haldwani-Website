"use client";

import { useState, useEffect } from "react";
import { RefreshCw, DownloadCloud, UploadCloud, Database, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function MigrationPage() {
  const [status, setStatus] = useState<any>({ status: "idle", progress: 0, logs: [], currentModel: "" });
  const [isPolling, setIsPolling] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPolling) {
      interval = setInterval(async () => {
        try {
          const res = await fetch("/api/migration/status");
          if (res.ok) {
            const data = await res.json();
            setStatus(data);
            if (data.status === "completed" || data.status === "failed") {
              setIsPolling(false);
            }
          }
        } catch (e) {
          console.error("Polling error", e);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPolling]);

  const triggerExport = async () => {
    setMessage("");
    try {
      const res = await fetch("/api/migration/export", { method: "POST" });
      if (res.ok) {
        setIsPolling(true);
      } else {
        const error = await res.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (e: any) { setMessage(`Execution failed: ${e.message}`); }
  }

  const triggerImport = async () => {
    setMessage("");
    try {
      const res = await fetch("/api/migration/import", { method: "POST" });
      if (res.ok) {
        setIsPolling(true);
      } else {
        const error = await res.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (e: any) { setMessage(`Execution failed: ${e.message}`); }
  }

  const triggerSync = async () => {
    setMessage("");
    try {
      const res = await fetch("/api/migration/sync", { method: "POST" });
      if (res.ok) {
        const statusRes = await fetch("/api/migration/status");
        const data = await statusRes.json();
        setStatus(data);
      } else {
        setMessage("Sync failed");
      }
    } catch (e: any) { setMessage(`Sync Execution failed: ${e.message}`); }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 border-l-4 border-indigo-600 pl-4 py-1">
            Legacy CMS Migration
          </h2>
          <p className="text-slate-500 mt-2 pl-5 max-w-xl">
            Safely extract, transform, and seamlessly ingest your decentralized Hygraph schemas securely into your dedicated PostgreSQL ecosystem.
          </p>
        </div>
        <button
          onClick={triggerSync}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 outline outline-1 outline-slate-300 rounded-lg shadow-sm font-medium transition-all"
        >
          <RefreshCw className="w-4 h-4" /> Auto-Sync Delta Updates
        </button>
      </div>

      {message && (
        <div className="bg-red-50 text-red-800 border-l-4 border-red-500 p-4 rounded-r-md flex items-center shadow-sm">
          <ShieldAlert className="w-5 h-5 mr-3" />
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 p-8 flex flex-col justify-between transition-all hover:border-indigo-200 hover:shadow-lg">
          <div>
             <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <DownloadCloud className="w-6 h-6 text-indigo-600" />
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-3">1. Execute Hygraph Export</h3>
             <p className="text-slate-600 text-sm leading-relaxed mb-6">
               Wirelessly pull all existing content models natively via the secured core Content API. Automatically retrieves structured relationships, raw JSON rich text layouts, image URLs, and dynamic schemas.
             </p>
          </div>
          <button 
             onClick={triggerExport} 
             disabled={status.status === "running"}
             className="w-full justify-center flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {status.status === "running" && status.progress < 50 ? <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> : null}
            Initialize Data Extraction
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 p-8 flex flex-col justify-between transition-all hover:border-blue-200 hover:shadow-lg">
          <div>
            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
               <UploadCloud className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">2. Deploy Translation & Importer</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
               Safely ingest cached extracts into your natively mapped SQL database. Preserves schema structures, bulk migrates media clusters dynamically into bucket storage, and enforces relationship constraints automatically.
            </p>
          </div>
          <button 
             onClick={triggerImport} 
             disabled={status.status === "running" || Object.keys(status.exportedData || {}).length === 0}
             className="w-full justify-center flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {status.status === "running" && status.progress >= 50 ? <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> : null}
            Commit to Local PostgreSQL
          </button>
        </div>
      </div>

      <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl mt-8">
         <div className="flex border-b border-slate-800 bg-slate-900 items-center justify-between px-6 py-4">
           <div className="flex items-center gap-3">
             <Database className="w-5 h-5 text-indigo-400" />
             <h3 className="font-semibold text-slate-200">System Command Logs & Telemetry</h3>
           </div>
           
           <div className="flex items-center gap-4 text-sm font-medium">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                status.status === "idle" ? "bg-slate-800 text-slate-400" :
                status.status === "running" ? "bg-indigo-500/20 text-indigo-400 animate-pulse" :
                status.status === "completed" ? "bg-teal-500/20 text-teal-400" :
                "bg-red-500/20 text-red-400"
              }`}>
                {status.status}
              </span>
              <span className="text-slate-400 w-12 text-right">{status.progress}%</span>
           </div>
         </div>
         
         {status.status === "running" && (
           <div className="h-1.5 w-full bg-slate-800 overflow-hidden">
             <div className="h-full bg-indigo-500 transition-all duration-300 ease-out" style={{ width: `${status.progress}%` }}></div>
           </div>
         )}
         
         <div className="p-6 space-y-4">
           {status.currentModel && (
             <div className="text-indigo-300 text-sm font-medium mb-4 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></div>
               Evaluating Namespace: {status.currentModel} 
             </div>
           )}

           <div className="space-y-2 h-[280px] overflow-y-auto pr-4 custom-scrollbar font-mono text-xs">
             {(!status.logs || status.logs.length === 0) && (
               <div className="text-slate-600 flex flex-col items-center justify-center h-full space-y-3">
                 <CheckCircle2 className="w-8 h-8 opacity-20" />
                 <span>Awaiting directive triggers. Internal buffers empty.</span>
               </div>
             )}
             
             {status.logs?.map((log: string, i: number) => (
               <div key={i} className="flex">
                 <span className="text-indigo-400/50 select-none mr-3 opacity-0 group-hover:opacity-100">~</span>
                 <span className={`leading-relaxed group ${log.toLowerCase().includes('failed') || log.toLowerCase().includes('error') || log.toLowerCase().includes('aborted') ? 'text-red-400 font-bold' : log.toLowerCase().includes('success') ? 'text-teal-400' : 'text-slate-300'}`}>
                   {log}
                 </span>
               </div>
             ))}
           </div>
         </div>
      </div>
    </div>
  )
}
