"use client";

import React, { useState } from "react";
import { Search, Loader2, FileCheck, AlertCircle } from "lucide-react";

export default function TCVerifyPage() {
  const [searchType, setSearchType] = useState("tcNumber");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/verify-tc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchType, value: value.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }

      setResult(data.data);
    } catch (err: any) {
      setError(err.message || "Record Not Found");
    } finally {
      setLoading(false);
    }
  };

  const getInputType = () => {
    if (searchType === "dateOfBirth") return "date";
    return "text";
  };

  const getPlaceholder = () => {
    switch (searchType) {
      case "tcNumber": return "e.g. TC/2023/001";
      case "studentName": return "e.g. Rahul Sharma";
      case "admissionNumber": return "e.g. 10245";
      case "dateOfBirth": return "";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-[#3B2565]">Verify Transfer Certificate</h2>
          <p className="mt-2 text-sm text-gray-600">
            Check the authenticity of student records securely using our verified database.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Search By</label>
                <div className="relative">
                  <select
                    value={searchType}
                    onChange={(e) => {
                      setSearchType(e.target.value);
                      setValue("");
                      setResult(null);
                      setError(null);
                    }}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-[#3B2565] transition-colors"
                  >
                    <option value="tcNumber">TC Number</option>
                    <option value="studentName">Student Name</option>
                    <option value="admissionNumber">Admission Number</option>
                    <option value="dateOfBirth">Date of Birth</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Enter {searchType === "tcNumber" ? "TC Number" : searchType === "studentName" ? "Name" : searchType === "admissionNumber" ? "Admission No." : "DOB"}
                </label>
                <div className="relative">
                  <input
                    type={getInputType()}
                    placeholder={getPlaceholder()}
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                    required
                    className="w-full bg-gray-50 border-gray-200 py-3 px-4 rounded-xl focus:outline-none focus:bg-white focus:border-[#3B2565] h-[46px]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !value.trim()}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#3B2565] hover:bg-[#2A1a4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3B2565] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Verifying...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Verify Record
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="rounded-2xl bg-red-50 p-6 border border-red-100 flex items-center shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <AlertCircle className="h-6 w-6 text-red-500 mr-4" />
            <h3 className="text-sm font-medium text-red-800">{error}</h3>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-green-50 px-6 py-4 flex items-center border-b border-green-100">
              <FileCheck className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="text-lg font-black text-green-900 uppercase tracking-widest">Verified Record Found</h3>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <DetailRow label="Student Name" value={result.studentName} />
                <DetailRow label="Father's Name" value={result.fatherName} />
                <DetailRow label="Class" value={result.studentClass} />
                <DetailRow label="TC Number" value={result.tcNumber} />
                <DetailRow label="Admission Number" value={result.admissionNumber} />
                <DetailRow label="Date of Birth" value={result.dob ? new Date(result.dob).toLocaleDateString() : "N/A"} />
                <DetailRow label="Issue Date" value={result.issueDate ? new Date(result.issueDate).toLocaleDateString() : "N/A"} />
                <DetailRow label="Status" value={result.status} highlight={result.status?.toLowerCase() === "verified" || result.status?.toLowerCase() === "valid"} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function DetailRow({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="border-b border-gray-50 pb-2">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className={`font-semibold ${highlight ? "text-green-600 font-bold" : "text-gray-900"}`}>{value || "—"}</p>
    </div>
  );
}
