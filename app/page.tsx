"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaShieldAlt, FaLock, FaUsers } from "react-icons/fa";

// ─── Particle Canvas (circuit network) ──────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      radius: number; alpha: number; pulse: number; pulseSpeed: number;
    };

    const COUNT = 90;
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mouse repulsion
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        p.pulse += p.pulseSpeed;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx -= (dx / dist) * force * 0.03;
          p.vy -= (dy / dist) * force * 0.03;
        }
        // speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) { p.vx *= 0.98; p.vy *= 0.98; }

        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,222,74,${a})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.35;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(45,122,45,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
        // Mouse connections
        const p = particles[i];
        const dx = p.x - mx, dy = p.y - my;
        const md = Math.sqrt(dx * dx + dy * dy);
        if (md < 160) {
          const alpha = (1 - md / 160) * 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(74,222,74,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Scan line
      const scanY = ((frame * 0.8) % (canvas.height + 40)) - 20;
      const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      grad.addColorStop(0, "rgba(74,222,74,0)");
      grad.addColorStop(0.5, "rgba(74,222,74,0.04)");
      grad.addColorStop(1, "rgba(74,222,74,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 30, canvas.width, 60);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}

// ─── Typing Terminal ────────────────────────────────────────
const LINES = [
  "$ Initializing CyberCommunity Pakistan...",
  "$ Loading threat intelligence matrix...",
  "$ Connecting 1,200+ security researchers...",
  "$ Scanning national cyber landscape...",
  "$ All systems operational. Welcome.",
];

function Terminal() {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (currentLine >= LINES.length) { setDone(true); return; }
    const line = LINES[currentLine];
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed(d => [...d, line]);
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, done]);

  const activeLine = currentLine < LINES.length ? LINES[currentLine].slice(0, currentChar) : "";

  return (
    <div
      className="rounded-xl p-4 font-mono text-xs leading-relaxed"
      style={{
        background: "rgba(6,13,6,0.85)",
        border: "1px solid rgba(74,222,74,0.2)",
        backdropFilter: "blur(12px)",
        minHeight: 148,
      }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        {["#ef5350","#ffb74d","#4ade4a"].map((c,i) => (
          <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
        ))}
        <span className="ml-2 text-[10px]" style={{ color: "#3d6b3d" }}>terminal — ccp_secure_shell</span>
      </div>
      {displayed.map((line, i) => (
        <div key={i} style={{ color: i === displayed.length - 1 && done ? "#4ade4a" : "#86efac" }}>
          {line}
        </div>
      ))}
      {!done && (
        <div style={{ color: "#4ade4a" }}>
          {activeLine}
          <span className="animate-pulse">▋</span>
        </div>
      )}
    </div>
  );
}

// ─── Holographic Floating Card ──────────────────────────────
function HoloCard({
  children, delay = 0, floatY = 12,
}: { children: React.ReactNode; delay?: number; floatY?: number }) {
  return (
    <div
      className="rounded-2xl p-4 backdrop-blur-xl"
      style={{
        background: "rgba(13,26,13,0.7)",
        border: "1px solid rgba(74,222,74,0.18)",
        boxShadow: "0 0 30px rgba(45,122,45,0.12), inset 0 1px 0 rgba(134,239,172,0.08)",
        animation: `float ${3 + delay}s ease-in-out infinite alternate`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Main Hero ──────────────────────────────────────────────
export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMouse({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <style>{`
        @keyframes float {
          from { transform: translateY(0px); }
          to   { transform: translateY(-14px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes ping-green {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes glitch {
          0%,100% { clip-path: inset(0 0 100% 0); }
          10% { clip-path: inset(10% 0 60% 0); transform: translateX(-4px); }
          20% { clip-path: inset(40% 0 30% 0); transform: translateX(4px); }
          30% { clip-path: inset(70% 0 5% 0); transform: translateX(-2px); }
          40% { clip-path: inset(0 0 0 0); transform: translateX(0); }
        }
        @keyframes reveal-line {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-fade-up { animation: fade-up 0.8s ease forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.5s; }
        .delay-4 { animation-delay: 0.7s; }
        .delay-5 { animation-delay: 0.9s; }
        .delay-6 { animation-delay: 1.1s; }
      `}</style>

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#060d06" }}
      >
        {/* Particle canvas */}
        <ParticleCanvas />

        {/* Deep vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1,
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(6,13,6,0.7) 100%)" }} />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ zIndex: 1,
          background: "linear-gradient(to bottom, transparent, #060d06)" }} />

        {/* Main content */}
        <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-8 pt-28 pb-16 grid lg:grid-cols-2 gap-16 items-center" style={{ zIndex: 2 }}>

          {/* ── Left column ─── */}
          <div className="space-y-7">

            {/* Badge */}
            <div className="anim-fade-up inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-semibold"
              style={{ background: "rgba(74,222,74,0.08)", border: "1px solid rgba(74,222,74,0.2)", color: "#4ade4a" }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: "#4ade4a", animation: "ping-green 1.2s cubic-bezier(0,0,0.2,1) infinite" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#4ade4a" }} />
              </span>
              Pakistan's Rising Cyber Force
            </div>

            {/* Headline — glitch + gradient */}
            <div className="anim-fade-up delay-1 relative">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.04] tracking-tight"
                style={{ color: "#f0faf0" }}>
                Defend.
                <br />
                <span className="relative inline-block" style={{
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundImage: "linear-gradient(135deg, #4ade4a 0%, #86efac 40%, #2d7a2d 80%)",
                  backgroundClip: "text",
                }}>
                  Inspire.
                </span>
                <br />
                Advance.
              </h1>
              {/* Underline reveal */}
              <div className="mt-3 h-px" style={{
                background: "linear-gradient(90deg, #4ade4a, transparent)",
                animation: "reveal-line 1.2s ease 0.5s forwards", width: 0,
              }} />
            </div>

            {/* Subtext */}
            <p className="anim-fade-up delay-2 text-lg max-w-lg leading-relaxed" style={{ color: "#6b9b6b" }}>
              Pakistan's premier cybersecurity movement — connecting ethical hackers,
              researchers, and defenders to build a safer digital nation.
            </p>

            {/* Terminal */}
            <div className="anim-fade-up delay-3">
              <Terminal />
            </div>

            {/* CTAs */}
            <div className="anim-fade-up delay-4 flex flex-wrap gap-4">
              <Link href="#join"
                className="group relative overflow-hidden px-8 py-3.5 font-bold rounded-full flex items-center gap-2 transition-all"
                style={{ background: "#2d7a2d", color: "#f0faf0", boxShadow: "0 0 0 0 rgba(74,222,74,0)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(74,222,74,0.35)";
                  (e.currentTarget as HTMLElement).style.background = "#3a9a3a";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(74,222,74,0)";
                  (e.currentTarget as HTMLElement).style.background = "#2d7a2d";
                }}>
                {/* Shimmer sweep */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                    backgroundSize: "200%", animation: "shimmer 1s ease" }} />
                Join Community <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#about"
                className="px-8 py-3.5 rounded-full transition-all font-medium"
                style={{ border: "1px solid rgba(134,239,172,0.2)", color: "#86efac" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,74,0.5)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(74,222,74,0.05)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(134,239,172,0.2)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}>
                Explore Mission
              </Link>
            </div>

            {/* Stats row */}
            <div className="anim-fade-up delay-5 flex gap-8 pt-2">
              {[["1,200+","Members"],["24+","Events"],["12+","Experts"]].map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-extrabold" style={{ color: "#4ade4a" }}>{v}</p>
                  <p className="text-xs tracking-widest uppercase" style={{ color: "#3d5c3d" }}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — orbital shield ─── */}
          <div className="anim-fade-up delay-6 relative flex items-center justify-center"
            style={{ transform: `perspective(1000px) rotateY(${mouse.x * 4}deg) rotateX(${-mouse.y * 3}deg)`,
              transition: "transform 0.12s ease" }}>

            {/* Outer ring — spinning dashes */}
            <div className="absolute rounded-full"
              style={{ width: 380, height: 380,
                border: "1px dashed rgba(45,122,45,0.3)",
                animation: "spin-slow 20s linear infinite" }} />

            {/* Middle ring */}
            <div className="absolute rounded-full"
              style={{ width: 290, height: 290,
                border: "1px solid rgba(74,222,74,0.12)",
                animation: "spin-reverse 14s linear infinite" }} />

            {/* Pulsing glow disk */}
            <div className="absolute rounded-full"
              style={{ width: 260, height: 260,
                background: "radial-gradient(circle, rgba(45,122,45,0.18) 0%, transparent 70%)",
                animation: "float 4s ease-in-out infinite alternate" }} />

            {/* Central shield card */}
            <div className="relative flex flex-col items-center justify-center rounded-3xl p-8 text-center z-10"
              style={{ width: 220, height: 220,
                background: "rgba(11,22,11,0.9)",
                border: "1px solid rgba(74,222,74,0.25)",
                boxShadow: "0 0 60px rgba(45,122,45,0.2), inset 0 0 40px rgba(74,222,74,0.03)",
                backdropFilter: "blur(20px)" }}>
              <div className="relative mb-3" style={{ width: 80, height: 80 }}>
                <Image src="/logo.png" alt="CCP Logo" fill className="object-contain drop-shadow-lg" />
              </div>
              <p className="font-bold text-sm" style={{ color: "#f0faf0" }}>CyberCommunity</p>
              <p className="text-xs font-semibold" style={{ color: "#4ade4a" }}>Pakistan</p>
              <p className="text-[10px] mt-1" style={{ color: "#3d5c3d" }}>Spurvance Labs</p>
            </div>

            {/* Orbiting dots on outer ring */}
            {[0, 90, 180, 270].map((deg, i) => (
              <div key={i} className="absolute rounded-full"
                style={{ width: 380, height: 380,
                  animation: `spin-slow 20s linear infinite`,
                  transform: `rotate(${deg}deg)` }}>
                <div className="absolute rounded-full"
                  style={{ width: 8, height: 8, background: "#4ade4a",
                    top: "50%", left: -4, marginTop: -4,
                    boxShadow: "0 0 10px rgba(74,222,74,0.8)" }} />
              </div>
            ))}

            {/* Floating holo cards — positioned around the shield */}
            <div className="absolute" style={{ top: -10, right: -90 }}>
              <HoloCard delay={0.5}>
                <div className="flex items-center gap-2">
                  <FaShieldAlt style={{ color: "#4ade4a", fontSize: 16 }} />
                  <div>
                    <p className="text-xs font-bold" style={{ color: "#f0faf0" }}>Threat Intel</p>
                    <p className="text-[10px]" style={{ color: "#4ade4a" }}>Live feed active</p>
                  </div>
                </div>
              </HoloCard>
            </div>

            <div className="absolute" style={{ bottom: 10, right: -80 }}>
              <HoloCard delay={1.2}>
                <div className="flex items-center gap-2">
                  <FaUsers style={{ color: "#86efac", fontSize: 14 }} />
                  <div>
                    <p className="text-xs font-bold" style={{ color: "#f0faf0" }}>1,200+</p>
                    <p className="text-[10px]" style={{ color: "#6b9b6b" }}>researchers online</p>
                  </div>
                </div>
              </HoloCard>
            </div>

            <div className="absolute" style={{ bottom: 30, left: -95 }}>
              <HoloCard delay={0.8}>
                <div className="flex items-center gap-2">
                  <FaLock style={{ color: "#4ade4a", fontSize: 14 }} />
                  <div>
                    <p className="text-xs font-bold" style={{ color: "#f0faf0" }}>CTF Season 3</p>
                    <p className="text-[10px]" style={{ color: "#4ade4a" }}>Aug 2026</p>
                  </div>
                </div>
              </HoloCard>
            </div>
          </div>
        </div>

        {/* Bottom scrolling marquee */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-3 border-t"
          style={{ zIndex: 2, borderColor: "rgba(45,122,45,0.15)", background: "rgba(6,13,6,0.8)",
            backdropFilter: "blur(10px)" }}>
          <div className="flex gap-12 whitespace-nowrap"
            style={{ animation: "marquee 22s linear infinite" }}>
            {Array(3).fill(0).map((_, ri) => (
              <div key={ri} className="flex gap-12 shrink-0">
                {["Network Security","Ethical Hacking","Threat Analysis","CTF Competitions","Penetration Testing","Incident Response","Malware Analysis","OSINT","Bug Bounty"].map((t) => (
                  <span key={t} className="text-xs font-mono tracking-widest uppercase"
                    style={{ color: "#3d6b3d" }}>
                    <span style={{ color: "#2d7a2d", marginRight: 8 }}>◆</span>{t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-33.333%); }
          }
          @keyframes shimmer {
            from { background-position: 200% center; }
            to   { background-position: -200% center; }
          }
        `}</style>
      </section>
    </>
  );
}