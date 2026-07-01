import React from "react";
import { EventCard } from "@/components/event-card";
import { fetchEvents } from "@/app/actions";

export default async function HomeEvents() {
  const events = await fetchEvents();

  const summaryEvents = events.slice(0, 4);

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

      {summaryEvents.length === 0 ? (
        <div className="w-full text-center py-12 border border-dashed border-[#22222b] text-[#8a8a93] text-xs uppercase tracking-wider">
          [!] No active operations found in data logs
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center justify-center w-full">
          {summaryEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
