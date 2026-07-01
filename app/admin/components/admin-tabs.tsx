"use client";

import React, { useState } from "react";
import EventForm from "./event-form"
import { LuPlus, LuX, LuTerminal } from "react-icons/lu";

interface AdminTabsProps {
  children: React.ReactNode;
  onSaveAction: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}

export default function AdminTabs({ children, onSaveAction }: AdminTabsProps) {
  const [showForm, setShowForm] = useState(false);

  const handleFormSuccess = async (formData: FormData) => {
    const result = await onSaveAction(formData);
    if (result.success) {
      setShowForm(false);
    }
    return result;
  };

  return (
    <div className="w-full min-h-screen bg-[#050507] text-[#8a8a93] font-mono p-6 space-y-6">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#22222b] pb-6 gap-4">
        <div>
          <div className="opacity-50 text-[10px] uppercase tracking-widest text-[#8a8a93] flex items-center gap-1.5">
            <LuTerminal className="text-emerald-500 animate-pulse" /> root@cybercommunitypakistan:~#
          </div>
          <h1 className="font-bold text-[#f8f9fa] text-xl tracking-tight mt-1">
            Administrative Control Panel
          </h1>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            showForm
              ? "border border-rose-500/40 bg-rose-950/20 text-rose-400 hover:bg-rose-500 hover:text-white"
              : "border border-foreground-main bg-foreground-main text-[#050507] hover:bg-transparent hover:text-foreground-main"
          }`}
        >
          {showForm ? (
            <><LuX className="w-4 h-4" /> ABORT_OPERATION //</>
          ) : (
            <><LuPlus className="w-4 h-4" /> DEPLOY_NEW_EVENT //</>
          )}
        </button>
      </div>

      {/* Main Switch Panel */}
      <div className="relative">
        {showForm ? (
          <div className="max-w-4xl mx-auto">
            <EventForm onSave={handleFormSuccess} />
          </div>
        ) : (
          <div>
            {/* Render the passed Server Component directly */}
            {children}
          </div>
        )}
      </div>
    </div>
  );
}