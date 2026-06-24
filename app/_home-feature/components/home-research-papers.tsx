"use client";

import React from "react";
import { ResearchCard } from "@/components/shared-cards/research-paper-card";
import { samplePapers } from "../mock-data";

export default function HomeResearch() {
  return (
    <div className="space-y-6 w-full font-mono">
      <div>
        <div className="flex items-center gap-2 mb-1 text-[#8a8a93] text-xs">
          <span className="opacity-50">radar</span>
          <span className="bg-[#8a8a93]/30 w-2 h-0.5"></span>
        </div>
        <h2 className="font-bold text-[#f8f9fa] text-lg sm:text-xl tracking-tight">
          Research Matrix
        </h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 bg-[#15151a]/60 p-2.5 border border-[#22222b] text-[#8a8a93] text-[11px] select-none">
          <span className="opacity-90 text-[#00ff66]">$</span>
          <span className="opacity-80">
            ./recent_labs_projects --tail {samplePapers.length}
          </span>
        </div>

        <div className="space-y-3">
          {samplePapers.map((paper) => (
            <ResearchCard key={paper.id} paper={paper} />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center px-0.5 pt-1 text-[#8a8a93]/40 text-[10px] tracking-wide select-none">
        <span>HW_VER: 2.0.4-LTS</span>
        <a
          href="/research-papers"
          className="opacity-80 hover:opacity-100 font-medium hover:text-[#f8f9fa] transition-colors"
        >
          ACCESS_FULL_ARCHIVE &gt;&gt;
        </a>
      </div>
    </div>
  );
}
