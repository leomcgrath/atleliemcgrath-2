"use client";

import { useState } from "react";
import { signIn } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signIn(email, password);
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-black text-[#0a0e27] uppercase tracking-tighter mb-2">
              Admin Login
            </h1>
            <div className="w-16 h-1 bg-[#FFD700] mx-auto mb-4"></div>
            <p className="text-gray-600">Sign in to manage race calendar and content</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-colors"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FFD700] hover:bg-[#FFE55C] text-black font-black py-3 px-6 rounded-lg border-2 border-black uppercase tracking-wider transition-all hover:scale-105 disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-gray-600 hover:text-[#0a0e27] font-bold uppercase tracking-wider text-sm transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}