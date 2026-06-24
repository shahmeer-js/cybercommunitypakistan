"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LuGithub, LuLock, LuTerminal } from "react-icons/lu";
import { CgArrowRight } from "react-icons/cg";

export default function Footer() {
  const resourceLinks = [
    { name: "./github_repos", href: "/repos" },
    { name: "./whitepapers", href: "/whitepapers" },
    { name: "./incident_report", href: "/incident-report" },
  ];

  return (
    <footer className="bg-[#0f0f12] px-6 py-16 border-[#22222b]/40 border-t w-full font-mono text-[#8a8a93]">
      <div className="items-start gap-12 md:gap-6 grid grid-cols-1 md:grid-cols-12 mx-auto max-w-7xl">
        {/* Left Column: Brand & Description */}
        <div className="space-y-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="CCP Logo"
              className="opacity-90 invert"
              width={20}
              height={20}
            />
            <span className="font-bold text-[#f8f9fa] text-sm uppercase tracking-wider">
              CCP
            </span>
          </div>

          <p className="opacity-80 max-w-xs font-normal text-xs leading-relaxed">
            Pakistan&apos;s premier cybersecurity community dedicated to fostering
            innovation, security awareness, and technical expertise across the
            digital landscape.
          </p>

          {/* Social / Terminal Glyph Shortcuts */}
          <div className="flex items-center gap-4 text-[#8a8a93]/70">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f8f9fa] transition-colors"
            >
              <LuGithub className="w-4 h-4" />
            </a>
            <a
              href="#secure"
              className="hover:text-[#f8f9fa] transition-colors"
            >
              <LuLock className="w-4 h-4" />
            </a>
            <div className="flex items-center gap-0.5 font-bold hover:text-[#f8f9fa] text-xs transition-colors cursor-pointer">
              <LuTerminal className="w-4 h-4" />
              <span className="-mt-1 text-[10px]">_</span>
            </div>
          </div>
        </div>

        {/* Middle Column: Links */}
        <div className="space-y-4 md:col-span-4">
          <h4 className="font-bold text-[#f8f9fa] text-[11px] uppercase tracking-widest">
            Resources
          </h4>
          <ul className="space-y-2.5 text-xs">
            {resourceLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block opacity-80 hover:opacity-100 hover:text-[#f8f9fa] transition-colors duration-150"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Contact & Copyright */}
        <div className="space-y-4 md:col-span-4">
          <h4 className="font-bold text-[#f8f9fa] text-[11px] uppercase tracking-widest">
            Contact & Verify
          </h4>

          <div className="space-y-2">
            <span className="block font-bold text-[#8a8a93]/60 text-[10px] uppercase tracking-wider">
              Main Company Web
            </span>
            {/* Main Company Web */}
            <div className="flex bg-[#050507] p-3 border border-[#22222b] overflow-x-auto font-bold text-[#f8f9fa] text-[10px] tracking-wider whitespace-nowrap select-all items-center justify-center gap-1">
              Spurvance Labs - An open source IT related company
              <span
                className="text-[#8a8a93]/60 hover:text-[#f8f9fa] transition-colors cursor-pointer"
                onClick={() =>
                  window.open("https://spurvancelabs.com", "_blank")
                }
              >
                <CgArrowRight size={20} />
              </span>
            </div>
          </div>

          <div className="space-y-0.5 pt-2 text-[#8a8a93]/50 text-[10px] leading-relaxed">
            <p>© 2026 Cyber Community Pakistan.</p>
            <p>All rights reserved. Secure transmission active.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
