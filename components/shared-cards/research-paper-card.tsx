import React from "react";
import { LuDownload } from "react-icons/lu";
import { ResearchPaperData } from "@/types/research-paper";

export function ResearchCard({ paper }: { paper: ResearchPaperData }) {
  return (
    <div className="group flex justify-between items-start gap-4 bg-[#15151a] p-4 border border-[#22222b] hover:border-[#8a8a93]/30 transition-all duration-200 cursor-pointer">
      <div className="space-y-1">
        <span className="block text-[#8a8a93]/60 text-[10px] tracking-wider">
          {paper.timestamp}
        </span>
        <h4 className="font-bold text-[#f8f9fa] group-hover:text-white text-xs transition-colors">
          {paper.title}
        </h4>
        <p className="opacity-80 max-w-sm font-serif text-[#8a8a93]/80 text-[11px] line-clamp-1">
          {paper.excerpt}
        </p>
      </div>

      <a
        href={paper.downloadUrl}
        className="p-1 text-[#8a8a93] hover:text-[#f8f9fa] transition-colors"
        title="Download Artifact"
        onClick={(e) => e.stopPropagation()}
      >
        <LuDownload className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
