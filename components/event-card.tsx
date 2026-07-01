import React from "react";
import Image from "next/image";
import { EventData } from "@/types/events";
import Button from "@/components/ui/button";
import { LuCalendar, LuClock, LuArrowUpRight } from "react-icons/lu";
import Link from "next/link";

interface EventCardProps {
  event: EventData;
}

export function EventCard({ event }: EventCardProps) {
  const currentStatus = (event as any).status as string | undefined;
  const isLive = currentStatus === "LIVE";

  const displayImage =
    event.image || ((event as any).image_url as string | undefined);

  const rawDateTime =
    event.dateTime || ((event as any).date_time as string | undefined);
  const displayDate =
    event.timeDate ||
    (rawDateTime
      ? new Date(rawDateTime).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "");

  const totalParticipants =
    event.totalParticipants ??
    ((event as any).total_participants as number | undefined) ??
    0;
  const seatsLeft =
    ((event as any).seatsLeft as number | undefined) ??
    ((event as any).seats_left as number | undefined);

  return (
    <div className="group/card flex w-full max-w-sm flex-col justify-between border border-[#22222b] bg-[#0f0f12] p-5 font-mono transition-all duration-200 hover:border-[#ffffff]/40 hover:shadow-[0_0_25px_rgba(0,0,0,0.8)]">
      <div className="flex flex-col flex-grow">
        {/* Top Header Row */}
        <div className="mb-4 flex items-center justify-between gap-2 text-[10px] text-[#8a8a93]">
          <span
            className={`flex items-center gap-1.5 border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase ${
              isLive
                ? "border-[#ffffff] bg-[#ffffff] text-[#0f0f12]"
                : "border-[#22222b] bg-transparent text-[#8a8a93]"
            }`}
          >
            {isLive && (
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0f0f12] opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0f0f12]"></span>
              </span>
            )}
            {currentStatus || "UPCOMING"}
          </span>

          {/* Time/Date Indicator */}
          <div className="flex items-center gap-1.5 font-medium opacity-80">
            {isLive ? (
              <LuClock className="h-3.5 w-3.5" />
            ) : (
              <LuCalendar className="h-3.5 w-3.5" />
            )}
            <span>{displayDate}</span>
          </div>
        </div>

        {/* Image Display Area */}
        <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden border border-[#22222b] bg-[#15151a]">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={event.title}
              fill
              sizes="(max-w-768px) 100vw, 384px"
              className="object-cover opacity-90 transition-all duration-500 group-hover/card:scale-102 group-hover/card:opacity-100"
              priority={isLive}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-10 transition-opacity duration-300 group-hover/card:opacity-20">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#22222b_1px,transparent_1px),linear-gradient(to_bottom,#22222b_1px,transparent_1px)] bg-[size:16px_16px]" />
              <svg
                className="h-12 w-12 text-[#ffffff]"
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
            </div>
          )}
        </div>

        {/* Title Heading */}
        <h3 className="mb-4 text-[15px] font-bold leading-snug tracking-tight text-[#f8f9fa] line-clamp-2 min-h-[44px]">
          {event.title}
        </h3>
      </div>

      {/* Footer Content */}
      <div className="space-y-4 mt-auto">
        {/* Statistics Monitor Meta Block */}
        <div className="border-t border-[#22222b] pt-3 text-[11px] text-[#8a8a93] space-y-2">
          <div className="flex justify-between items-center h-5">
            <div className="flex items-center gap-1">
              <span className="opacity-50">POOL:</span>
              <span className="font-semibold text-[#f8f9fa]">
                {totalParticipants}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="opacity-50">AVAIL:</span>
              <span className="font-semibold text-[#f8f9fa]">
                {seatsLeft === 0 ? "SOLD_OUT" : (seatsLeft ?? "UNLIMITED")}
              </span>
            </div>
          </div>

          {/* Action Reference Link */}
          <div className="flex justify-end pt-0.5">
            <a
              href={`/events/${event.slug}`}
              className="flex items-center gap-0.5 text-[#8a8a93] hover:text-[#ffffff] transition-colors hover:underline text-[10px]"
            >
              view_manifest <LuArrowUpRight className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Interactive Access Button */}
        <Link href={`/events/${event.id}/join`}>
          <Button
            variant={isLive ? "primary" : "secondary"}
            className="w-full text-xs font-bold uppercase tracking-widest h-10 flex items-center justify-center rounded-none"
          >
            {isLive ? "CONNECT_TO_MATCH //" : "SECURE_REGISTRATION //"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
