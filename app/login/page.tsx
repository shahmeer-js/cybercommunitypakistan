"use client";

import React, { useState } from "react";
import { login } from "./actions";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await login({ email, password });

      if (result && !result.success) {
        setError(result.error || "Authentication failed.");
      }

      router.push("/admin");
    } catch (err) {
      setError("A connection error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 selection:bg-white/15 selection:text-accent-main">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1c1c24_1px,transparent_1px),linear-gradient(to_bottom,#1c1c24_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25" />

      {/* Main Terminal Card */}
      <div className="terminal-card w-full max-w-md overflow-hidden rounded-md shadow-2xl hover:border-accent-muted/30">
        {/* Terminal Header Window Controls */}
        <div className="flex items-center justify-between border-b border-card-stroke bg-card-main px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-terminal-amber animate-pulse-slow" />
            <span className="font-mono text-code-sm text-accent-muted">
              admin_auth.sh
            </span>
          </div>
          <span className="font-mono text-code-sm text-accent-muted/40">
            v4.0.0
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-section-title text-foreground-main font-serif">
              Access Restricted
            </h1>
            <p className="mt-2 font-mono text-code-sm text-accent-muted">
              Enter secure credentials to provision a root session.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message Box */}
            {error && (
              <div className="border border-terminal-amber/30 bg-terminal-amber/5 p-3 font-mono text-code-sm text-terminal-amber">
                <span className="font-bold">[ERROR]</span> {error}
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block font-mono text-code-sm font-medium text-accent-muted uppercase tracking-wider"
              >
                Admin Identifier
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="root@system.local"
                className="w-full border border-card-stroke bg-bg-main px-4 py-3 font-mono text-code-sm text-foreground-main transition-colors placeholder:text-accent-muted/30 focus:border-accent-main focus:outline-none"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block font-mono text-code-sm font-medium text-accent-muted uppercase tracking-wider"
              >
                Security Key
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full border border-card-stroke bg-bg-main px-4 py-3 font-mono text-code-sm text-foreground-main transition-colors placeholder:text-accent-muted/30 focus:border-accent-main focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex w-full items-center justify-center border border-accent-main bg-accent-main py-3 font-mono text-code-sm font-bold text-bg-main transition-all hover:bg-transparent hover:text-accent-main disabled:pointer-events-none disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-current" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:0.4s]" />
                </span>
              ) : (
                "INITIALIZE_SESSION //"
              )}
            </button>
          </form>
        </div>

        {/* Footer info line */}
        <div className="border-t border-card-stroke bg-bg-main/50 px-6 py-3 text-center">
          <p className="font-mono text-[11px] text-accent-muted/50 uppercase tracking-widest">
            Unauthorised access is strictly logged & monitored
          </p>
        </div>
      </div>
    </div>
  );
}
