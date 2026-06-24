"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "./home", href: "/" },
    { name: "./events", href: "/events" },
    { name: "./research-papers", href: "/research-papers" },
    { name: "./community", href: "/community" },
    { name: "./about", href: "/about" },
  ];

  return (
    <header className="z-50 relative bg-bg-main border-card-stroke/40 border-b w-full">
      <div className="flex justify-between items-center mx-auto px-6 py-5 max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="relative flex justify-center items-center">
            <Image
              src="/logo.png"
              alt="Cyber Community Pakistan Logo"
              className="invert"
              width={30}
              height={30}
              priority
            />
          </div>
          <span className="font-mono font-bold text-foreground-main text-sm tracking-tight">
            Cyber Community Pakistan
          </span>
        </div>

        {/* Desktop links */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name} className="transition-colors duration-200">
                <Link
                  href={link.href}
                  className="font-mono font-medium text-[11px] hover:text-foreground-main tracking-wide text-accent-muted"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop button */}
        <div className="hidden md:block">
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-foreground-main px-4 py-1.5 border-accent-muted/40 font-mono text-[11px] text-foreground-main hover:text-bg-main normal-case tracking-normal"
          >
            Join Us
          </Button>
        </div>

        {/* Hamburger Menu for mobile */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-50 relative flex flex-col justify-center items-center gap-1.5 w-8 h-8 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`h-0.5 w-6 bg-foreground-main transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground-main transition-all duration-200 ease-in-out ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground-main transition-all duration-300 ease-in-out ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile navigation menu */}
      <div
        className={`fixed inset-0 bg-bg-main pt-24 px-6 md:hidden transition-all duration-300 ease-in-out border-b border-card-stroke/40 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.name} onClick={() => setIsOpen(false)}>
                <Link
                  href={link.href}
                  className="block py-1 font-mono font-medium hover:text-foreground-main text-base tracking-wide text-accent-muted"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="pt-4 border-card-stroke/40 border-t"
            onClick={() => setIsOpen(false)}
          >
            <Button
              variant="outline"
              size="md"
              className="hover:bg-foreground-main py-3 border-accent-muted/40 w-full font-mono text-foreground-main hover:text-bg-main text-xs"
            >
              Join Us
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
