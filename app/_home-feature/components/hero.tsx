import React from "react";
import { LuActivity } from "react-icons/lu";

export default function CompactHeroSection() {
  return (
    <section className="relative bg-bg-main selection:bg-foreground-main/15 mx-auto px-6 pt-24 pb-16 w-full max-w-4xl font-mono text-foreground-main selection:text-foreground-main text-center">
      {/* Top status bar badge */}
      <div className="inline-flex justify-center items-center mb-8">
        <div className="inline-flex items-center gap-2 bg-card-main/60 px-4 py-1.5 border border-card-stroke rounded-full text-[10px] uppercase tracking-widest text-accent-muted/90">
          <LuActivity className="w-3 h-3 text-terminal-green animate-pulse" />
          <span>
            System Status:{" "}
            <span className="font-bold text-terminal-green">Operational</span>
          </span>
        </div>
      </div>

      {/* Main hero typography header */}
      <h1 className="flex flex-col justify-center items-center mb-8 font-bold leading-[1.1] tracking-tight select-none">
        <span className="block text-foreground-main text-4xl sm:text-5xl md:text-6xl tracking-tighter">
          Empowering
        </span>

        <span className="block text-foreground-main text-4xl sm:text-5xl md:text-6xl tracking-tighter">
          Pakistan&apos;s
        </span>

        <span
          className="block mt-2 font-serif text-[#4a4a55] text-4xl sm:text-5xl md:text-6xl tracking-normal"
          style={{ textShadow: "0 0 40px rgba(138, 138, 147, 0.05)" }}
        >
          Digital Frontiers
        </span>
      </h1>

      {/* Hero introduction text */}
      <p className="mx-auto mb-10 px-4 max-w-2xl text-xs sm:text-sm leading-relaxed tracking-wide text-accent-muted/80">
        The national hub for cybersecurity excellence. Join 5,000+
        <br className="hidden sm:inline" /> researchers, developers, and
        security enthusiasts in building
        <br className="hidden sm:inline" /> a more resilient digital future for
        Pakistan.
      </p>

      {/* Action buttons at the bottom */}
      <div className="flex sm:flex-row flex-col justify-center items-center gap-4 sm:gap-6">
        <button
          type="button"
          className="bg-transparent hover:bg-foreground-main px-6 py-2.5 border border-foreground-main w-full sm:w-auto font-bold text-foreground-main hover:text-bg-main text-xs uppercase tracking-wider active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          JOIN THE COMMUNITY
        </button>

        <a
          href="#docs"
          className="group flex items-center gap-1.5 py-2 font-medium hover:text-foreground-main text-xs transition-colors text-accent-muted/70"
        >
          view_documentation
          <span className="group-hover:text-foreground-main transition-transform group-hover:translate-x-1 text-accent-muted/50">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
