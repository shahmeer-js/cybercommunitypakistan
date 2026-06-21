"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowRight, FaTwitter, FaLinkedinIn,
  FaGithub, FaDiscord, FaStar, FaChevronRight
} from "react-icons/fa";

// ─── Types ──────────────────────────────────────────────────
type Vec3 = { x: number; y: number; z: number };

// ─── Dust Canvas (full page background) ─────────────────────
function DustCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    let W = 0, H = 0;
    const resize = () => {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 140 }, () => ({
      x: Math.random() * 2000, y: Math.random() * 1400,
      r: Math.random() * 0.9 + 0.2,
      a: Math.random() * 0.3 + 0.05,
      vx: (Math.random() - 0.5) * 0.07,
      vy: (Math.random() - 0.5) * 0.06,
      ph: Math.random() * Math.PI * 2,
      ps: Math.random() * 0.007 + 0.002,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.ph += p.ps; p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const a = p.a * (0.5 + 0.5 * Math.sin(p.ph));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,220,120,${a})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}

// ─── Sweep Lines Canvas (inside a card) ─────────────────────
function SweepCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const resize = () => {
      cv.width = cv.offsetWidth;
      cv.height = cv.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    const sweeps = Array.from({ length: 5 }, () => ({
      y: Math.random() * 800,
      speed: 0.2 + Math.random() * 0.15,
      alpha: 0.018 + Math.random() * 0.018,
      cx: Math.random(),
      w: 250 + Math.random() * 300,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      sweeps.forEach((s) => {
        s.y += s.speed;
        if (s.y > cv.height + 80) { s.y = -80; s.cx = Math.random(); }
        const cx2 = cv.width * s.cx;
        const g = ctx.createLinearGradient(0, 0, cv.width, 0);
        g.addColorStop(0, "rgba(40,140,40,0)");
        const l = Math.max(0, (cx2 - s.w / 2) / cv.width);
        const r = Math.min(1, (cx2 + s.w / 2) / cv.width);
        g.addColorStop(l, "rgba(40,140,40,0)");
        g.addColorStop(Math.min(1, cx2 / cv.width), `rgba(74,222,74,${s.alpha})`);
        g.addColorStop(r, "rgba(40,140,40,0)");
        g.addColorStop(1, "rgba(40,140,40,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, s.y - 1, cv.width, 2);
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return (
    <canvas
      ref={ref}
      className={`absolute inset-0 w-full h-full pointer-events-none rounded-[22px] ${className ?? ""}`}
      style={{ zIndex: 0 }}
    />
  );
}

// ─── 3D Globe Canvas ─────────────────────────────────────────
function GlobeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const S = 300;
    cv.width = S; cv.height = S;
    const R = 118;
    const cx = S / 2, cy = S / 2;
    const tilt = 0.28;
    const cosT = Math.cos(tilt), sinT = Math.sin(tilt);
    const COUNT = 2200;
    const pts: Vec3[] = Array.from({ length: COUNT }, (_, i) => {
      const theta = Math.acos(1 - 2 * (i / COUNT));
      const phi = Math.PI * (1 + Math.sqrt(5)) * i;
      return { x: theta, y: phi, z: 0 };
    });
    let rot = 0, raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, S, S);
      const rendered = pts.map((p) => {
        const phi2 = p.y + rot;
        const x3 = R * Math.sin(p.x) * Math.cos(phi2);
        const y3 = R * Math.sin(p.x) * Math.sin(phi2);
        const z3 = R * Math.cos(p.x);
        const y4 = y3 * cosT - z3 * sinT;
        const z4 = y3 * sinT + z3 * cosT;
        return { sx: cx + x3, sy: cy + y4, z: z4 };
      }).sort((a, b) => a.z - b.z);
      rendered.forEach(({ sx, sy, z }) => {
        const vis = (z + R) / (2 * R);
        const a = vis * vis * 0.9;
        const sz = 0.5 + vis * 1.1;
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, sz * 2.5);
        g.addColorStop(0, `rgba(74,222,74,${a})`);
        g.addColorStop(1, `rgba(74,222,74,0)`);
        ctx.beginPath(); ctx.arc(sx, sy, sz, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      });
      rot += 0.0038;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas
      ref={ref}
      className="absolute pointer-events-none"
      style={{ bottom: -60, left: "50%", transform: "translateX(-50%)", opacity: 0.5, zIndex: 0 }}
    />
  );
}

// ─── Section Card wrapper ────────────────────────────────────
function Card({
  children, className = "", id,
}: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <div
      id={id}
      className={`relative mx-auto overflow-hidden ${className}`}
      style={{
        background: "rgba(8,16,8,0.82)",
        border: "1px solid rgba(74,222,74,0.09)",
        borderRadius: 22,
        backdropFilter: "blur(2px)",
      }}
    >
      {/* top highlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: 320, height: 1, background: "linear-gradient(90deg,transparent,rgba(74,222,74,0.4),transparent)", zIndex: 1 }}
      />
      {children}
    </div>
  );
}

// ─── Bracket label ───────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-[10px] tracking-[.16em] uppercase font-mono"
      style={{ color: "rgba(74,222,74,0.5)" }}
    >
      [ {children} ]
    </span>
  );
}


export default function Home() {

  return (
    <main
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: "#060d06" }}
    >
      <DustCanvas />

      {/* Aurora beam */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 380, height: 460,
          background: "radial-gradient(ellipse 55% 100% at 50% 0%, rgba(45,160,45,0.20) 0%, rgba(20,80,20,0.07) 55%, transparent 100%)",
          zIndex: 0,
        }}
      />

      {/* ─── All sections as cards ──────────────────────────── */}
      <div className="relative z-10 flex flex-col gap-4 px-3 sm:px-6 pt-6 pb-32 max-w-5xl mx-auto">

        {/* ── HERO ─────────────────────────────────────────── */}
        <Card id="home">
          <SweepCanvas />
          <GlobeCanvas />

          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 pt-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
                style={{ border: "1px solid rgba(74,222,74,0.2)", background: "rgba(74,222,74,0.08)" }}
              >
                <Image src="/logo.png" alt="CCP" width={26} height={26} className="object-contain" />
              </div>
              <span className="text-sm font-semibold tracking-tight" style={{ color: "#f0faf0" }}>
                Cyber<span style={{ color: "#4ade4a" }}>Community</span> Pakistan
              </span>
            </Link>
            <a
              href="#join"
              className="hidden sm:flex items-center gap-0 rounded-full overflow-hidden transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,74,0.3)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"}
            >
              <span className="px-4 py-2 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Join Now</span>
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold m-0.5"
                style={{ background: "#4ade4a", color: "#060d06" }}
              >↗</span>
            </a>
          </div>

          {/* Hero content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-10 pt-14 pb-0">
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            >
              <Label>Pakistan's Cybersecurity Movement</Label>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              className="mt-6 font-light leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(34px,6vw,60px)", color: "#fff", letterSpacing: -1.5 }}
            >
              We are{" "}
              <strong
                style={{
                  fontWeight: 700,
                  background: "linear-gradient(135deg,#4ade4a,#86efac)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Pakistan's
              </strong>
              <br />
              rising cyber <strong style={{ fontWeight: 700, color: "#fff" }}>defence force</strong>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
              className="mt-5 text-sm leading-relaxed max-w-md"
              style={{ color: "rgba(255,255,255,0.32)" }}
            >
              Connecting ethical hackers, security researchers, and defenders
              across Pakistan to build a safer digital nation — backed by Spurvance Labs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}
              className="flex gap-3 mt-8 mb-16"
            >
              <a
                href="#join"
                className="px-6 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-all"
                style={{ background: "#2d7a2d", color: "#e8f5e8" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#3a9a3a"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 22px rgba(74,222,74,0.28)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#2d7a2d"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                Join Community &nbsp;→
              </a>
              <a
                href="#about"
                className="px-6 py-2.5 rounded-md text-sm transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,74,0.3)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
              >
                Our Mission
              </a>
            </motion.div>
          </div>

          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58 }}
            className="relative z-10 grid grid-cols-3"
            style={{ borderTop: "1px solid rgba(74,222,74,0.08)" }}
          >
            {[
              { n: "01", title: "We connect talent", desc: "Networking Pakistan's top security minds with industry leaders and researchers." },
              { n: "02", title: "We build skills", desc: "Expert sessions, CTF competitions, workshops, and hands-on mentorship." },
              { n: "03", title: "We grow careers", desc: "Accelerating Pakistan's cyber workforce and national security ecosystem." },
            ].map((p, i) => (
              <div
                key={i}
                className="px-6 py-5"
                style={{ borderRight: i < 2 ? "1px solid rgba(74,222,74,0.07)" : "none" }}
              >
                <Label>{p.n}</Label>
                <p className="mt-2 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.82)" }}>{p.title}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed hidden sm:block" style={{ color: "rgba(255,255,255,0.28)" }}>{p.desc}</p>
              </div>
            ))}
          </motion.div>
        </Card>

        {/* ── ABOUT ────────────────────────────────────────── */}
        <Card id="about">
          <SweepCanvas />
          <div className="relative z-10 grid sm:grid-cols-2 gap-0">
            <div className="px-8 py-10" style={{ borderRight: "1px solid rgba(74,222,74,0.08)" }}>
              <Label>About the Movement</Label>
              <h2 className="mt-4 font-light leading-tight" style={{ fontSize: "clamp(26px,4vw,40px)", color: "#fff", letterSpacing: -1 }}>
                A space for<br />
                <strong
                  style={{ fontWeight: 700, background: "linear-gradient(135deg,#4ade4a,#86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  cyber talent
                </strong>
              </h2>
              <p className="mt-4 text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.32)" }}>
                Backed by Spurvance Labs, CyberCommunity Pakistan creates a
                collaborative space where security professionals at every level
                can connect, learn, and grow.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                {["Online events & expert panels", "Hands-on workshops & CTF challenges", "Mentorship & career guidance"].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-[12px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#4ade4a" }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="px-8 py-10 grid grid-cols-2 gap-3 content-start">
              {[
                { v: "1,200+", l: "Members", d: "↑ 12% this month" },
                { v: "24+", l: "Events run", d: "↑ Next: Jul 2026" },
                { v: "12+", l: "Expert mentors", d: "↑ Industry leaders" },
                { v: "8+", l: "Partners", d: "↑ Growing network" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl p-4"
                  style={{ background: "rgba(6,13,6,0.7)", border: "1px solid rgba(45,122,45,0.12)" }}
                >
                  <p className="text-xl font-bold" style={{ color: "#f0faf0" }}>{s.v}</p>
                  <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: "rgba(255,255,255,0.28)" }}>{s.l}</p>
                  <p className="text-[10px] mt-1" style={{ color: "#4ade4a" }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ── EVENTS ───────────────────────────────────────── */}
        <Card id="events">
          <SweepCanvas />
          <div className="relative z-10 px-8 py-10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <Label>Upcoming</Label>
                <h2 className="mt-3 font-light" style={{ fontSize: "clamp(24px,3.5vw,36px)", color: "#fff", letterSpacing: -1 }}>
                  Events &{" "}
                  <strong
                    style={{ fontWeight: 700, background: "linear-gradient(135deg,#4ade4a,#86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                  >
                    Activities
                  </strong>
                </h2>
              </div>
              <span className="text-[11px] hidden sm:block" style={{ color: "rgba(74,222,74,0.4)" }}>[ EXPLORE ]</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { n: "01", title: "Launch Webinar", date: "July 2026", desc: "Kickoff session with Pakistan's top security leaders and industry voices." },
                { n: "02", title: "CTF Season 3", date: "August 2026", desc: "Open capture-the-flag competition for all experience levels nationwide." },
                { n: "03", title: "Career Conclave", date: "September 2026", desc: "Connect with top employers and senior mentors in cybersecurity." },
              ].map((ev, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 group cursor-pointer transition-all duration-300"
                  style={{ background: "rgba(6,13,6,0.6)", border: "1px solid rgba(45,122,45,0.12)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,74,0.28)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(45,122,45,0.12)"}
                >
                  <Label>{ev.n}</Label>
                  <p className="mt-3 text-sm font-semibold" style={{ color: "#f0faf0" }}>{ev.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>{ev.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded"
                      style={{ background: "rgba(74,222,74,0.08)", color: "#4ade4a", border: "1px solid rgba(74,222,74,0.15)" }}
                    >
                      {ev.date}
                    </span>
                    <FaChevronRight className="text-[10px]" style={{ color: "rgba(74,222,74,0.4)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ── COMMUNITY / TESTIMONIALS ─────────────────────── */}
        <Card id="community">
          <SweepCanvas />
          <div className="relative z-10 px-8 py-10">
            <Label>Community</Label>
            <h2 className="mt-3 mb-7 font-light" style={{ fontSize: "clamp(24px,3.5vw,36px)", color: "#fff", letterSpacing: -1 }}>
              What our{" "}
              <strong
                style={{ fontWeight: 700, background: "linear-gradient(135deg,#4ade4a,#86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                members say
              </strong>
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { name: "Aisha Khan", role: "Security Researcher", av: "AK", quote: "This community has been instrumental in my growth. The knowledge sharing here is unparalleled." },
                { name: "Bilal Ahmed", role: "Penetration Tester", av: "BA", quote: "Finally, a place where Pakistan's cyber talent can come together and build something meaningful." },
                { name: "Sarah Mahmood", role: "Cybersecurity Student", av: "SM", quote: "The mentorship here gave me real clarity on my career path in less than three months." },
              ].map((t, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 transition-all duration-300"
                  style={{ background: "rgba(6,13,6,0.6)", border: "1px solid rgba(45,122,45,0.12)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,74,0.25)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(45,122,45,0.12)"}
                >
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => <FaStar key={j} className="text-[10px]" style={{ color: "#4ade4a" }} />)}
                  </div>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>"{t.quote}"</p>
                  <div className="flex items-center gap-2.5 mt-4 pt-4" style={{ borderTop: "1px solid rgba(45,122,45,0.1)" }}>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{ background: "rgba(45,122,45,0.25)", color: "#4ade4a" }}
                    >
                      {t.av}
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: "#f0faf0" }}>{t.name}</p>
                      <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.28)" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ── CTA ──────────────────────────────────────────── */}
        <Card id="join">
          <SweepCanvas />
          <div className="relative z-10 flex flex-col items-center text-center px-8 py-14">
            <Label>Ready to join?</Label>
            <h2 className="mt-4 font-light leading-tight" style={{ fontSize: "clamp(28px,4.5vw,48px)", color: "#fff", letterSpacing: -1.5 }}>
              Be part of the{" "}
              <strong
                style={{ fontWeight: 700, background: "linear-gradient(135deg,#4ade4a,#86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                movement
              </strong>
            </h2>
            <p className="mt-4 text-sm max-w-md" style={{ color: "rgba(255,255,255,0.32)" }}>
              Join CyberCommunity Pakistan today and help shape the future of cybersecurity across the nation.
            </p>
            <div className="flex gap-3 mt-8">
              <a
                href="#"
                className="px-8 py-3 rounded-md text-sm font-semibold tracking-wide transition-all"
                style={{ background: "#2d7a2d", color: "#e8f5e8" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#3a9a3a"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(74,222,74,0.3)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#2d7a2d"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                Join Now &nbsp;→
              </a>
              <a
                href="#"
                className="px-8 py-3 rounded-md text-sm transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,74,0.3)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
              >
                Learn More
              </a>
            </div>
          </div>
        </Card>

        {/* ── FOOTER ───────────────────────────────────────── */}
        <Card>
          <SweepCanvas />
          <div className="relative z-10 px-8 py-8">
            <div className="grid sm:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0"
                    style={{ border: "1px solid rgba(74,222,74,0.18)", background: "rgba(74,222,74,0.06)" }}>
                    <Image src="/logo.png" alt="CCP" width={28} height={28} className="object-contain" />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "#f0faf0" }}>
                    Cyber<span style={{ color: "#4ade4a" }}>Community</span>PK
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.25)" }}>
                  A Project of Spurvance Labs — building Pakistan's cybersecurity future.
                </p>
              </div>
              {[
                { title: "Navigate", links: ["About", "Mission", "Events", "Community"] },
                { title: "Resources", links: ["Blog", "Events", "Careers"] },
              ].map((col) => (
                <div key={col.title}>
                  <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: "rgba(74,222,74,0.4)" }}>{col.title}</p>
                  <ul className="space-y-2">
                    {col.links.map((l) => (
                      <li key={l}>
                        <a
                          href="#"
                          className="text-xs transition-colors"
                          style={{ color: "rgba(255,255,255,0.28)" }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(74,222,74,0.8)"}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.28)"}
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: "rgba(74,222,74,0.4)" }}>Connect</p>
                <div className="flex gap-2">
                  {[FaTwitter, FaLinkedinIn, FaGithub, FaDiscord].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-7 h-7 rounded-md flex items-center justify-center transition-all"
                      style={{ background: "rgba(6,13,6,0.8)", border: "1px solid rgba(45,122,45,0.18)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,74,0.35)"; (e.currentTarget as HTMLElement).style.background = "rgba(74,222,74,0.08)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(45,122,45,0.18)"; (e.currentTarget as HTMLElement).style.background = "rgba(6,13,6,0.8)"; }}
                    >
                      <Icon className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 pt-5 flex items-center justify-between text-[10px]"
              style={{ borderTop: "1px solid rgba(45,122,45,0.1)", color: "rgba(255,255,255,0.18)" }}>
              <span>© {new Date().getFullYear()} CyberCommunityPakistan · Spurvance Labs</span>
              <span style={{ color: "rgba(74,222,74,0.25)" }}>PK · EST. 2025</span>
            </div>
          </div>
        </Card>
      </div>

    </main>
  );
}