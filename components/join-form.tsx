"use client";

import React, { useState } from "react";
import { submitRegistration } from "@/app/actions";
import { LuMail, LuCircleCheck } from "react-icons/lu";

export function JoinForm({ eventId }: { eventId: string }) {
  const [status, setStatus] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const currentForm = e.currentTarget; 
    setLoading(true);
    setStatus(null);

    const formData = new FormData(currentForm);
    const result = await submitRegistration(formData);

    setLoading(false);
    if (result.success) {
      setIsRegistered(true);
      currentForm.reset();
    } else {
      setStatus({ type: "err", text: result.error });
    }
  }

  if (isRegistered) {
    return (
      <div className="p-6 text-center space-y-4 font-mono animate-fade-in">
        <div className="border border-[#ffffff]/30 bg-[#ffffff]/5 p-6 flex flex-col items-center justify-center space-y-4">
          <div className="relative flex h-12 w-12 items-center justify-center border border-[#ffffff]/20 bg-[#15151a]">
            <LuCircleCheck className="h-6 w-6 text-emerald-400" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-400 animate-ping rounded-full" />
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#ffffff]">
              REGISTRATION_COMMITTED // SUCCESS
            </h4>
            <p className="text-[11px] text-accent-muted/80 max-w-xs leading-relaxed uppercase">
              You have successfully registered for this operation matrix.
            </p>
          </div>

          <div className="w-full border-t border-dashed border-[#22222b] my-2" />

          <div className="flex items-center gap-2 text-left bg-[#050507] border border-[#22222b] p-3 w-full">
            <LuMail className="h-4 w-4 text-[#ffffff] shrink-0" />
            <div className="text-[10px] uppercase tracking-wide text-accent-muted">
              <span className="text-[#ffffff] font-bold">[ACTION_REQUIRED]:</span> Wait for confirmation email to secure physical/node presence.
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsRegistered(false)} 
          className="text-[10px] text-accent-muted/50 hover:text-[#ffffff] uppercase tracking-widest transition-colors cursor-pointer"
        >
          &lt;&lt; Return to system terminal
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {status && (
        <div
          className={`border p-3 text-xs ${
            status.type === "err"
              ? "border-red-500 text-red-400 bg-red-950/20"
              : "border-[#ffffff] text-[#ffffff]"
          }`}
        >
          <span className="font-bold">
            [{status.type === "err" ? "FAIL" : "OK"}]
          </span>{" "}
          {status.text}
        </div>
      )}

      <input type="hidden" name="eventId" value={eventId} />
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#f8f9fa]">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="ABDULLAH"
          className="w-full border border-[#22222b] bg-[#050507] p-3 text-xs text-[#f8f9fa] focus:border-[#ffffff]/40 focus:outline-none"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#f8f9fa]">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="example@example.com"
          className="w-full border border-[#22222b] bg-[#050507] p-3 text-xs text-[#f8f9fa] focus:border-[#ffffff]/40 focus:outline-none"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#f8f9fa]">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone_number"
          required
          placeholder="+923 555-0199"
          className="w-full border border-[#22222b] bg-[#050507] p-3 text-xs text-[#f8f9fa] focus:border-[#ffffff]/40 focus:outline-none"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#f8f9fa]">
          Professional Affiliation
        </label>
        <input
          type="text"
          name="profession"
          required
          placeholder="Cyber Expert etc."
          className="w-full border border-[#22222b] bg-[#050507] p-3 text-xs text-[#f8f9fa] focus:border-[#ffffff]/40 focus:outline-none"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#f8f9fa]">
          Uni/Clg Name
        </label>
        <input
          type="text"
          name="institute_name"
          required
          placeholder="UET / GCT"
          className="w-full border border-[#22222b] bg-[#050507] p-3 text-xs text-[#f8f9fa] focus:border-[#ffffff]/40 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full border border-[#ffffff] bg-[#ffffff] py-3 text-xs font-bold uppercase tracking-widest text-[#0f0f12] transition-all hover:bg-transparent hover:text-[#ffffff] disabled:opacity-40 cursor-pointer"
      >
        {loading ? "COMMITTING..." : "SUBMIT_REGISTRATION //"}
      </button>
    </form>
  );
}