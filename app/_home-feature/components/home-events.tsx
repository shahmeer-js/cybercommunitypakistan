"use client";

import React from "react";
import { EventCard } from "@/components/shared-cards/event-card";
import { sampleEvents } from "../mock-data";

export default function HomeEvents() {
  return (
    <div className="space-y-8 font-mono w-full max-w-7xl mx-auto px-4">
      <div>
        <div className="opacity-50 mb-1 text-[#8a8a93] text-xs">
          terminal --summary
        </div>
        <h2 className="font-bold text-[#f8f9fa] text-xl">
          Interactive Events & Labs Hub
        </h2>
      </div>

      {/* Centered responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center justify-center w-full">
        {sampleEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}