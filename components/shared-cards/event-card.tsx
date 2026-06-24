import React from "react";
import Image from "next/image";
import { EventData } from "@/types/events";
import { LuCalendar, LuClock, LuArrowUpRight } from "react-icons/lu";
import Button from "../ui/button";

interface EventCardProps {
  event: EventData;
}

export function EventCard({ event }: EventCardProps) {
  const isLive = event.status === "LIVE";
  const isOpen = event.status === "REGISTRATION OPEN";

  // Accent colors mapping
  const colors = {
    LIVE: {
      border: "border-l-[#00ff66]",
      text: "text-[#00ff66]",
      bg: "bg-[#00ff66]/10",
      raw: "#00ff66",
    },
    "REGISTRATION OPEN": {
      border: "border-l-[#00d2ff]",
      text: "text-[#00d2ff]",
      bg: "bg-[#00d2ff]/10",
      raw: "#00d2ff",
    },
    UPCOMING: {
      border: "border-l-[#ffb700]",
      text: "text-[#ffb700]",
      bg: "bg-[#ffb700]/10",
      raw: "#ffb700",
    },
  };

  const currentTheme = colors[event.status] || colors["UPCOMING"];

  return (
    <div
      className={`bg-[#0d0d12] border border-[#22222b] p-5 font-mono transition-all duration-300 hover:border-[#8a8a93]/40 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col justify-between w-full max-w-sm border-l-2 ${currentTheme.border}`}
    >
      <div>
        {/* Top Header Row */}
        <div className="flex justify-between items-center gap-2 mb-4 text-[#8a8a93] text-[10px]">
          <span
            className={`px-2 py-0.5 rounded-sm font-bold flex items-center gap-1.5 text-[9px] tracking-wider uppercase ${currentTheme.bg} ${currentTheme.text}`}
          >
            {isLive && (
              <span className="relative flex w-1.5 h-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00ff66]"></span>
              </span>
            )}
            {event.status}
          </span>

          <div className="flex items-center gap-1.5 font-medium opacity-80">
            {isLive ? (
              <LuClock className="w-3.5 h-3.5" />
            ) : (
              <LuCalendar className="w-3.5 h-3.5" />
            )}
            <span>{event.timeDate}</span>
          </div>
        </div>

        {/* Unified Image Container (Fixed Aspect Ratio) */}
        <div className="relative w-full aspect-[16/9] mb-4 bg-[#15151a] border border-[#22222b]/60 rounded-sm overflow-hidden group">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-w-768px) 100vw, 384px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={isLive}
            />
          ) : (
            /* Elegant vector cyber grid placeholder when image asset is missing */
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-300">
              <svg
                className="w-16 h-16 text-[#8a8a93]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#22222b_1px,transparent_1px),linear-gradient(to_bottom,#22222b_1px,transparent_1px)] bg-[size:14px_24px]" />
            </div>
          )}
        </div>

        {/* Title Container */}
        <h3 className="mb-4 font-bold text-[#f8f9fa] text-[15px] sm:text-base tracking-tight leading-snug line-clamp-2 min-h-[44px]">
          {event.title}
        </h3>
      </div>

      {/* Footer Content */}
      {/* Footer Content */}
      <div className="space-y-4">
        {/* Restructured Meta Block */}
        <div className="pt-3 border-t border-[#22222b]/60 text-[#8a8a93] text-[11px] space-y-2">
          {/* Row 1: Data Points */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="opacity-60">Pool:</span>
              <span className="text-[#f8f9fa] font-semibold">
                {event.totalParticipants}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="opacity-60">Available:</span>
              <span
                className={
                  event.seatsLeft === 0
                    ? "text-[#ef4444] font-semibold"
                    : "text-[#f8f9fa] font-semibold"
                }
              >
                {event.seatsLeft}
              </span>
            </div>
          </div>

          {/* Row 2: Link Interaction (Pushed to bottom-right) */}
          <div className="flex justify-end pt-0.5">
            <a
              href={`/events/${event.slug}`}
              className="flex items-center gap-0.5 text-[#8a8a93] hover:text-[#f8f9fa] transition-colors font-medium hover:underline text-[10px]"
            >
              details <LuArrowUpRight className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* Call to Action Button */}
        <Button
          variant={isLive ? "primary" : "outline"}
          className={`w-full font-bold uppercase tracking-wider text-xs h-9 transition-all duration-300 ${
            isLive
              ? "bg-[#00ff66] text-[#0d0d12] hover:bg-[#00e65c] border-none"
              : "border-[#22222b] text-[#f8f9fa] hover:bg-[#15151a] hover:border-[#8a8a93]/50"
          }`}
        >
          {isLive ? "Join Match" : "Register Now"}
        </Button>
      </div>
    </div>
  );
}
