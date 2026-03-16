"use client";

import React, { useState, useTransition } from "react";
import { verifyTransferCertificate } from "@/app/transfer-certificate/actions";
import { Search, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TCSearchForm = () => {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const response = await verifyTransferCertificate(formData);
      if (response.error) {
        setError(response.error);
      } else {
        setResult(response.data);
      }
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto -mt-20 px-4 relative z-20">
      <div className="bg-white rounded-2xl shadow-xl p-8 transition-all hover:shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Search By</label>
              <select
                name="searchBy"
                className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B2565] transition-all"
                defaultValue="tcNumber"
              >
                <option value="tcNumber">TC Number</option>
                <option value="studentName">Student Name</option>
                <option value="admissionNumber">Admission Number</option>
                <option value="dob">Date of Birth (YYYY-MM-DD)</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Enter Value</label>
              <Input
                name="searchValue"
                placeholder="Enter search value..."
                className="h-10 focus-visible:ring-[#3B2565]"
                required
              />
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white px-10 py-6 rounded-full text-lg font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Verify Certificate
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-xl flex items-center gap-4 text-red-700 animate-in fade-in zoom-in duration-300">
          <XCircle className="h-8 w-8 text-red-500 shrink-0" />
          <p className="font-medium text-lg">{error}</p>
        </div>
      )}

      {/* Success Result */}
      {result && (
        <div className="mt-8 p-8 bg-white border border-gray-100 shadow-xl rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-100 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#3B2565]">Certificate Details</h2>
              <p className="text-gray-500">Authentication successful</p>
            </div>
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
              <CheckCircle className="h-5 w-5" />
              <span>Verified Certificate</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <DetailRow label="Student Name" value={result.studentName} />
            <DetailRow label="Father's Name" value={result.fatherName} />
            <DetailRow label="Admission No." value={result.admissionNumber} />
            <DetailRow label="Class" value={result.studentClass} />
            <DetailRow label="Date of Issue" value={new Date(result.issueDate).toLocaleDateString()} />
            <DetailRow label="TC Number" value={result.tcNumber} />
            <DetailRow label="Date of Birth" value={new Date(result.dob).toLocaleDateString()} />
            <DetailRow label="Status" value={result.status} isStatus />
          </div>
        </div>
      )}
    </div>
  );
};

const DetailRow = ({ label, value, isStatus }: { label: string; value: string; isStatus?: boolean }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-xs uppercase tracking-wider font-bold text-gray-400">{label}</span>
    <span className={`text-lg font-semibold ${isStatus && value === "Verified" ? "text-green-600" : "text-[#3B2565]"}`}>
      {value || "N/A"}
    </span>
  </div>
);

export default TCSearchForm;
