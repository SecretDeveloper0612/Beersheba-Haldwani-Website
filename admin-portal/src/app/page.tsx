"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, Mail, Loader2, Eye, EyeOff, Shield, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error || "Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#3B2565] flex-col justify-between p-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
          <div className="absolute top-10 right-10 h-64 w-64 rounded-full border-[40px] border-white" />
          <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full border-[30px] border-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full border-[60px] border-white opacity-50" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-white font-black text-lg uppercase tracking-widest">Admin Portal</span>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl font-black text-white leading-tight">
            Beersheba<br />School<br />
            <span className="text-white/50">Haldwani</span>
          </h1>
          <p className="text-white/60 text-lg font-medium leading-relaxed max-w-sm">
            Manage website content, gallery, admissions, news, and more — all from one powerful dashboard.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
          <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center font-black text-white text-lg">B</div>
          <div>
            <p className="font-black text-white text-sm">Beersheba Sr Sec School</p>
            <p className="text-white/50 text-xs font-medium">Established 1977 · CBSE Affiliated</p>
          </div>
        </div>
      </div>

      {/* Right Login Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-5 duration-700">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 justify-center mb-10">
            <div className="bg-[#3B2565] p-2 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-[#3B2565] font-black text-xl uppercase tracking-widest">Admin Portal</span>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-black text-gray-900 mb-3">Sign in</h2>
            <p className="text-gray-500 font-medium">Enter your admin credentials to access the dashboard.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@beersheba.ac.in"
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white text-gray-800 font-medium outline-none focus:ring-2 focus:ring-[#3B2565]/30 focus:border-[#3B2565] transition-all placeholder:text-gray-300 shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full h-14 pl-12 pr-12 rounded-2xl border border-gray-200 bg-white text-gray-800 font-medium outline-none focus:ring-2 focus:ring-[#3B2565]/30 focus:border-[#3B2565] transition-all placeholder:text-gray-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded accent-[#3B2565]" />
                <span className="text-sm text-gray-500 font-medium">Keep me signed in</span>
              </label>
              <a href="#" className="text-sm font-bold text-[#3B2565] hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-[#3B2565] hover:bg-[#2A1a4a] text-white rounded-2xl text-base font-black shadow-xl shadow-[#3B2565]/30 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-10 font-medium">
            &copy; 2024 Beersheba School Haldwani. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
