"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CgArrowRight } from "react-icons/cg";

export default function Footer() {
  const resourceLinks = [
    { name: "./github_repos", href: "https://github.com/spurvancelabs" }
  ];

  return (
    <footer className="w-full border-t border-card-stroke bg-bg-main px-6 py-16 font-mono text-accent-muted">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 sm:grid-cols-2 md:grid-cols-12 md:gap-6">
        
        {/* Left Column: Brand & Description */}
        <div className="space-y-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="CCP Logo"
              className="invert opacity-90"
              width={20}
              height={20}
            />
            <span className="text-sm font-bold uppercase tracking-wider text-foreground-main">
              CCP
            </span>
          </div>

          <p className="max-w-xs text-xs font-normal leading-relaxed opacity-80">
            Pakistan&apos;s premier cybersecurity community dedicated to fostering
            innovation, security awareness, and technical expertise across the
            digital landscape.
          </p>
        </div>

        {/* Middle Column: Links */}
        <div className="space-y-4 md:col-span-4">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground-main">
            Resources
          </h4>
          <ul className="space-y-2.5 text-xs">
            {resourceLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block opacity-80 transition-colors duration-150 hover:text-foreground-main hover:opacity-100"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Contact & Copyright */}
        <div className="space-y-4 md:col-span-4">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground-main">
            Contact & Verify
          </h4>

          <div className="space-y-2">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-accent-muted/50">
              Main Company Web
            </span>
            
            {/* Semantic Access Block Wrapper */}
            <a
              href="https://spurvancelabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border border-card-stroke bg-card-main p-3 text-[10px] font-bold tracking-wider text-foreground-main transition-colors hover:border-accent-muted/40"
            >
              <span className="truncate pr-2">
                Spurvance Labs - An open source IT related company
              </span>
              <CgArrowRight className="h-4 w-4 shrink-0 text-accent-muted/60 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground-main" />
            </a>
          </div>

          <div className="pt-2 text-[10px] leading-relaxed text-accent-muted/40">
            <p>© 2026 Cyber Community Pakistan.</p>
            <p>All rights reserved. Secure transmission active.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}