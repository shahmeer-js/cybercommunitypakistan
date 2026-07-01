"use client";

import React from "react";

export default function HomeLoadingPage() {
  return (
    <div className="w-full min-h-screen bg-[#050507] text-[#8a8a93] font-mono select-none">
      {/* Top Background Matrix Grid Lines Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111115_1px,transparent_1px),linear-gradient(to_bottom,#111115_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 mx-auto px-6 pt-24 pb-16 max-w-4xl text-center">
        {/* Status Badge Skeleton */}
        <div className="inline-flex justify-center items-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#0a0a0f] px-4 py-1.5 border border-[#22222b] rounded-full text-[10px] uppercase tracking-widest text-emerald-500/80">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>ESTABLISHING_SECURE_LINK...</span>
          </div>
        </div>

        {/* Hero Header Skeleton */}
        <div className="flex flex-col justify-center items-center mb-8 space-y-3">
          <div className="h-10 w-64 bg-[#111115] rounded animate-pulse" />
          <div className="h-10 w-72 bg-[#111115] rounded animate-pulse delay-75" />
          <div className="h-10 w-80 bg-[#16161f] rounded animate-pulse delay-150" />
        </div>

        {/* Hero Intro Text Skeleton */}
        <div className="flex flex-col items-center space-y-2 mx-auto mb-10 max-w-2xl">
          <div className="h-3 w-5/6 bg-[#111115] rounded animate-pulse" />
          <div className="h-3 w-4/6 bg-[#111115] rounded animate-pulse" />
        </div>

        {/* Hero Button Skeletons */}
        <div className="flex sm:flex-row flex-col justify-center items-center gap-4 sm:gap-6">
          <div className="h-9 w-full sm:w-44 bg-[#111115] border border-[#22222b] animate-pulse" />
          <div className="h-4 w-32 bg-[#111115]/60 animate-pulse" />
        </div>
      </div>

      {/* --- Events Section Loading Hub --- */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-16 pb-24 space-y-8">
        <div>
          <div className="mb-2 text-[#4a4a55] text-xs uppercase tracking-widest animate-pulse">
            Executing: sys_fetch --target=operations
          </div>
          <div className="h-6 w-72 bg-[#111115] rounded animate-pulse" />
        </div>

        {/* Grid Container matching your Event Hub structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center justify-center w-full">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="w-full max-w-[280px] border border-[#22222b] bg-[#0a0a0f] p-4 space-y-4 flex flex-col justify-between"
              style={{
                animationDelay: `${index * 100}s`,
              }}
            >
              {/* Card Image Skeleton */}
              <div className="w-full aspect-video bg-[#111115] border border-[#16161f] relative overflow-hidden animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1c1c24]/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>

              {/* Card Title & Content */}
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-[#111115] rounded animate-pulse" />
                <div className="h-3 w-full bg-[#111115] rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-[#111115] rounded animate-pulse" />
              </div>

              {/* Card Meta Stats Footer */}
              <div className="pt-4 border-t border-[#16161f] flex justify-between items-center">
                <div className="h-3 w-16 bg-[#111115] rounded animate-pulse" />
                <div className="h-3 w-20 bg-[#111115] rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
