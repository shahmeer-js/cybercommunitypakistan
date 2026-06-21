"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Community", href: "/community" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 rounded-full px-1.5 py-1.5"
      style={{
        background: "rgba(8,16,8,0.92)",
        border: "1px solid rgba(74,222,74,0.13)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.55)",
      }}
    >
      {NAV_ITEMS.map((item, i) => (
        <div key={item.href} className="flex items-center">
          {i === 2 && (
            <span
              className="w-1 h-1 rounded-full mx-0.5"
              style={{ background: "#4ade4a" }}
            />
          )}

          <Link
            href={item.href}
            className="px-4 py-2 rounded-full text-xs transition-all duration-200 tracking-wide"
            style={{
              background:
                pathname === item.href
                  ? "rgba(74,222,74,0.12)"
                  : "transparent",

              color:
                pathname === item.href
                  ? "#fff"
                  : "rgba(255,255,255,0.38)",

              border:
                pathname === item.href
                  ? "1px solid rgba(74,222,74,0.22)"
                  : "1px solid transparent",
            }}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  );
}