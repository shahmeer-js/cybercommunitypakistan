import React from "react";
import { JoinForm } from "@/components/join-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JoinPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 font-mono selection:bg-white/15 selection:text-[#ffffff]">
      <div className="w-full max-w-md border border-[#22222b] bg-[#0f0f12]">
        <div className="flex items-center justify-between border-b border-[#22222b] bg-[#15151a] px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#f8f9fa]">
            secure_gateway_node // id: {id}
          </span>
          <span className="text-[9px] text-[#8a8a93]/40">DB_ROUTER_v1.0</span>
        </div>
        <JoinForm eventId={id} />
      </div>
    </main>
  );
}
