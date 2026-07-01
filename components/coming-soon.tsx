import React from "react";

const ComingSoon = () => {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6 selection:bg-white/15 selection:text-accent-main">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1c1c24_1px,transparent_1px),linear-gradient(to_bottom,#1c1c24_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25" />

      <div className="absolute top-0 w-full border-b border-card-stroke bg-card-main/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-terminal-blue" />
            <h1 className="font-mono text-code-sm uppercase tracking-wider text-accent-muted">
              Project [redacted] // system_status:pending
            </h1>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-accent-muted/40">
            EST. ETA: TBD
          </span>
        </div>
      </div>

      <div className="text-center">
        <div className="mb-4 font-serif text-hero-title text-foreground-main">
          Access Pending
        </div>

        <div className="inline-flex items-center gap-3 font-mono text-section-title text-foreground-main">
          <span className="opacity-70">Provisioning environment</span>
          <span className="h-[2em] w-[0.15em] bg-terminal-green animate-pulse-slow shadow-[0_0_10px_#00ff66]" />
        </div>

        <p className="mt-8 max-w-lg font-mono text-code-sm text-accent-muted leading-relaxed">
          Initialization protocols are currently active. A secure connection is
          being established. We are finalizing deployments of the core modules.
          Check back soon for deployment completion notes.
        </p>
      </div>

      <div className="absolute -bottom-10 left-10 -rotate-12 opacity-10">
        <div className="terminal-card rounded-md p-6">
          <span className="font-mono text-[100px] font-bold text-card-stroke/30">
            /sys/v4.0.0
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 w-full border-t border-card-stroke bg-card-main/30 px-6 py-4 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent-muted/50">
          System Core: Active | Connection: Secure | Deployment: Queued
        </p>
      </div>
    </main>
  );
};

export default ComingSoon;
