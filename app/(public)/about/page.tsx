import React from "react";
import { LuTerminal, LuShield, LuBookOpen, LuGlobe } from "react-icons/lu";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050507] text-[#f8f9fa] font-mono px-4 py-16 md:py-24 selection:bg-[#ffffff] selection:text-[#0f0f12]">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Terminal Header Terminal Block */}
        <div className="border border-[#22222b] bg-[#0f0f12] p-6 space-y-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between border-b border-[#22222b] pb-3 text-xs text-[#8a8a93]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span>SYS_MANIFEST_v1.0.4</span>
            </div>
            <span>LOC: SECURE_NODE //</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight uppercase text-[#ffffff]">
              &gt;_ SPURVANCE_LABS
            </h1>
            <p className="text-xs md:text-sm text-[#8a8a93] leading-relaxed max-w-2xl">
              An open-source offensive and defensive security community
              engineering the future of digital sovereignty. We unify global
              cyber specialists, researchers, and engineers through targeted
              operational environments and peer-reviewed threat intelligence.
            </p>
          </div>
        </div>

        {/* Mission Matrix Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Core Core Module: Events */}
          <div className="border border-[#22222b] bg-[#0f0f12]/50 p-6 space-y-3 hover:border-[#ffffff]/20 transition-colors duration-200">
            <div className="flex items-center gap-2 text-[#ffffff]">
              <LuShield className="h-4 w-4 shrink-0" />
              <h3 className="text-xs font-bold uppercase tracking-widest">
                LIVE_OPERATIONS // EVENTS
              </h3>
            </div>
            <p className="text-[11px] text-[#8a8a93] leading-relaxed uppercase">
              From nationwide simulated Capture The Flag (CTF) scenarios to
              deep-dive cryptanalysis briefings. Our dynamic training matrices
              push analytical frameworks to breaking point to prepare experts
              for raw live-fire scenarios.
            </p>
          </div>

          {/* Core Module: Research Papers */}
          <div className="border border-[#22222b] bg-[#0f0f12]/50 p-6 space-y-3 hover:border-[#ffffff]/20 transition-colors duration-200">
            <div className="flex items-center gap-2 text-[#ffffff]">
              <LuBookOpen className="h-4 w-4 shrink-0" />
              <h3 className="text-xs font-bold uppercase tracking-widest">
                INTELLIGENCE_POOL // RESEARCH
              </h3>
            </div>
            <p className="text-[11px] text-[#8a8a93] leading-relaxed uppercase">
              We build open-source whitepapers, zero-day threat analysis
              pipelines, and vulnerability assessments. Our research repository
              provides accessible, hyper-technical intelligence designed to
              harden critical architectures.
            </p>
          </div>
        </div>

        {/* Tactical Parameters Footer Section */}
        <div className="border-t border-dashed border-[#22222b] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#8a8a93]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <LuTerminal className="h-3.5 w-3.5" />
              <span>STATUS: ACTIVE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <LuGlobe className="h-3.5 w-3.5" />
              <span>TYPE: OPEN_SOURCE</span>
            </div>
          </div>
          <p className="uppercase text-center sm:text-right font-medium tracking-wider">
            © {new Date().getFullYear()} SPURVANCE LABS // SECURE PROTOCOL
            COMMITTED.
          </p>
        </div>
      </div>
    </div>
  );
}
