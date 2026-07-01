import React from "react";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { LuUser, LuMail, LuBriefcase, LuActivity } from "react-icons/lu";

export default async function ViewRegistrations() {
  const supabase = await createSupabaseServerClient();

  const { data: registrations, error } = await supabase
    .from("registrations")
    .select(
      `
      id,
      name,
      email,
      phone_number,
      profession,
      institute_name,
      created_at,
      events ( title )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="border border-[#ffffff]/30 bg-[#ffffff]/5 p-4 font-mono text-xs text-[#ffffff]">
        <span className="font-bold">[CRITICAL_ERR]</span> Pipeline read failure
        during directory lookup: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full rounded-none border border-[#22222b] bg-[#0f0f12] font-mono text-accent-muted selection:bg-white/15 selection:text-foreground-main">
      {/* Top Console Bar */}
      <div className="flex items-center justify-between border-b border-[#22222b] bg-[#15151a] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-none bg-[#ffffff]" />
          <span className="text-xs font-bold uppercase tracking-wider text-foreground-main">
            attendee_registry.log
          </span>
        </div>
        <span className="text-[10px] text-accent-muted/40">
          TOTAL_RECORDS: {registrations?.length || 0}
        </span>
      </div>

      {/* Main Grid Wrapper */}
      <div className="p-6">
        {!registrations || registrations.length === 0 ? (
          <div className="w-full text-center py-12 border border-dashed border-[#22222b] text-accent-muted/50 text-xs uppercase tracking-wider">
            [!] Empty dataset // No operator logs recorded in system core
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b border-[#22222b] text-[10px] uppercase tracking-wider text-foreground-main opacity-60 bg-[#15151a]/30">
                  <th className="py-3 px-4 font-bold">Operator Profile</th>
                  <th className="py-3 px-4 font-bold">Secure Route Email</th>
                  <th className="py-3 px-4 font-bold">Affiliation Matrix</th>
                  <th className="py-3 px-4 font-bold">Target Operation</th>
                  <th className="py-3 px-4 font-bold text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22222b]/40">
                {registrations.map((reg) => {
                  const eventTitle =
                    (reg.events as any)?.title || "UNKNOWN NODE";
                  const formattedTime = new Date(reg.created_at).toLocaleString(
                    "en-US",
                    {
                      hour12: false,
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  );

                  return (
                    <tr
                      key={reg.id}
                      className="hover:bg-[#15151a]/40 transition-colors group"
                    >
                      {/* Operator Base Details */}
                      <td className="py-3.5 px-4 font-medium text-foreground-main">
                        <div className="flex items-center gap-2">
                          <LuUser className="h-3.5 w-3.5 opacity-40 shrink-0 group-hover:text-[#ffffff] group-hover:opacity-100 transition-opacity" />
                          <div className="flex flex-col">
                            <span className="truncate max-w-[150px] font-bold">
                              {reg.name}
                            </span>
                            <span className="text-[10px] text-accent-muted/40 font-mono tracking-tighter">
                              {reg.phone_number || "NO_COMMS_LINK"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Secure Route Email */}
                      <td className="py-3.5 px-4 text-accent-muted/80 vertical-align-middle">
                        <div className="flex items-center gap-2">
                          <LuMail className="h-3.5 w-3.5 opacity-30 shrink-0" />
                          <span className="select-all truncate max-w-[180px]">
                            {reg.email}
                          </span>
                        </div>
                      </td>

                      {/* Profession & Corporate Affiliation Parameters */}
                      <td className="py-3.5 px-4 text-accent-muted/70">
                        <div className="flex items-center gap-2">
                          <LuBriefcase className="h-3.5 w-3.5 opacity-30 shrink-0" />
                          <div className="flex flex-col">
                            <span className="truncate max-w-[160px]">
                              {reg.profession}
                            </span>
                            <span className="text-[10px] text-[#4a4a55] uppercase tracking-wide font-semibold">
                              {reg.institute_name || "INDEPENDENT_NODE"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Linked Target Event Operation */}
                      <td className="py-3.5 px-4 text-foreground-main/90 font-medium max-w-[200px] truncate">
                        <div className="flex items-center gap-2">
                          <LuActivity className="h-3.5 w-3.5 opacity-30 text-[#ffffff] shrink-0" />
                          <span>{eventTitle}</span>
                        </div>
                      </td>

                      {/* Log Entry Timestamp Tracking */}
                      <td className="py-3.5 px-4 text-right text-accent-muted/40 font-mono text-[11px] whitespace-nowrap">
                        [{formattedTime}]
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
