"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Mission", href: "#mission" },
  { name: "Events", href: "#events" },
  { name: "Community", href: "#community" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-4 left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4">
        <nav
          style={{
            background: "rgba(6,13,6,0.85)",
            borderColor: "rgba(45,122,45,0.25)",
          }}
          className="rounded-2xl backdrop-blur-xl border shadow-2xl"
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="CyberCommunityPakistan Logo"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="hidden sm:block">
                <span
                  className="text-sm font-bold"
                  style={{ color: "#f0faf0" }}
                >
                  Cyber
                  <span style={{ color: "#4ade4a" }}>Community</span>
                </span>
                <p className="text-[10px]" style={{ color: "#6b9b6b" }}>
                  Pakistan
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex md:items-center md:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium transition-all duration-200"
                  style={{ color: "#6b9b6b" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#4ade4a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#6b9b6b")
                  }
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="#join"
                className="ml-2 rounded-full px-5 py-1.5 text-sm font-semibold transition-all"
                style={{
                  border: "1px solid #2d7a2d",
                  background: "rgba(45,122,45,0.15)",
                  color: "#f0faf0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#2d7a2d";
                  e.currentTarget.style.color = "#060d06";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(45,122,45,0.15)";
                  e.currentTarget.style.color = "#f0faf0";
                }}
              >
                Join Now
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-full p-2 transition focus:outline-none"
              style={{ color: "#6b9b6b" }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FaTimes size={20} />
              ) : (
                <FaBars size={20} />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed left-1/2 z-40 w-full max-w-6xl -translate-x-1/2 px-4 transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "top-24 opacity-100 visible"
            : "top-20 opacity-0 invisible"
        }`}
      >
        <div
          className="rounded-2xl backdrop-blur-xl border overflow-hidden shadow-xl"
          style={{
            background: "rgba(6,13,6,0.95)",
            borderColor: "rgba(45,122,45,0.2)",
          }}
        >
          <div className="space-y-2 px-4 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-base font-medium transition"
                style={{ color: "#86efac" }}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-2">
              <Link
                href="#join"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center rounded-full px-4 py-2.5 text-base font-semibold transition"
                style={{
                  border: "1px solid #2d7a2d",
                  background: "rgba(45,122,45,0.15)",
                  color: "#f0faf0",
                }}
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}