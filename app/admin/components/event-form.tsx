"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface EventFormProps {
  initialData?: {
    id?: number;
    title: string;
    description: string;
    image_url?: string;
    venue: string;
    date_time: string;
  };
  onSave: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}

export default function EventForm({ initialData, onSave }: EventFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [venue, setVenue] = useState(initialData?.venue || "");
  const [dateTime, setDateTime] = useState(
    initialData?.date_time ? initialData.date_time.substring(0, 16) : "",
  );

  // File upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.image_url || null,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    if (initialData?.id) formData.append("id", initialData.id.toString());
    formData.append("title", title);
    formData.append("description", description);
    formData.append("venue", venue);
    formData.append("date_time", new Date(dateTime).toISOString());

    if (selectedFile) {
      formData.append("image_file", selectedFile);
    } else if (initialData?.image_url) {
      formData.append("existing_image_url", initialData.image_url);
    }

    try {
      const result = await onSave(formData);
      if (result.success) {
        router.refresh();
      } else {
        setError(result.error || "Execution failed.");
      }
    } catch (err) {
      setError("An unexpected interface error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="terminal-card w-full rounded-none border border-[#22222b] bg-[#0f0f12] font-mono text-accent-muted selection:bg-white/15 selection:text-foreground-main">
      <div className="flex items-center justify-between border-b border-[#22222b] bg-[#15151a] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-none bg-[#ffffff]" />
          <span className="text-xs font-bold uppercase tracking-wider text-foreground-main">
            {initialData ? "edit_event.config" : "create_event.config"}
          </span>
        </div>
        <span className="text-[10px] text-accent-muted/40">
          SYS_MUTATION_v3.0
        </span>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
          <div className="border border-[#ffffff]/30 bg-[#ffffff]/5 p-3 text-xs text-[#ffffff]">
            <span className="font-bold">[CRITICAL_ERR]</span> {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground-main">
            Event Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Cyber Defense Capture The Flag"
            className="w-full border border-[#22222b] bg-[#050507] p-3 text-xs text-foreground-main focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground-main">
            Operational Parameters (Description)
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-[#22222b] bg-[#050507] p-3 text-xs text-foreground-main resize-none focus:outline-none"
          />
        </div>

        {/* --- Image File Upload Area --- */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground-main">
            Banner Image Matrix Payload (File upload)
          </label>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative w-full border border-dashed border-[#22222b] hover:border-[#ffffff]/40 bg-[#050507] p-4 text-center cursor-pointer transition-colors"
          >
            {previewUrl ? (
              <div className="space-y-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mx-auto max-h-48 border border-[#22222b] object-cover"
                />
                <div className="text-[10px] text-emerald-400 uppercase tracking-widest">
                  [+] payload_attached:{" "}
                  {selectedFile ? selectedFile.name : "existing_asset.png"}
                </div>
              </div>
            ) : (
              <div className="py-6 space-y-1">
                <div className="text-xs text-foreground-main group-hover:text-[#ffffff] transition-colors">
                  INITIALIZE_IMAGE_UPLOAD // CLICK TO BROWSE
                </div>
                <div className="text-[10px] text-accent-muted/40">
                  PNG, JPG, OR WEBP MATRIX FORMATS ACCEPTS
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground-main">
              Assigned Node Location (Venue)
            </label>
            <input
              type="text"
              required
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full border border-[#22222b] bg-[#050507] p-3 text-xs text-foreground-main focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground-main">
              Execution Target Window (Date & Time)
            </label>
            <input
              type="datetime-local"
              required
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              onClick={(e) => e.currentTarget.showPicker?.()}
              className="w-full border border-[#22222b] bg-[#050507] p-3 text-xs text-foreground-main focus:outline-none cursor-pointer [scheme:dark]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full border border-[#ffffff] bg-[#ffffff] py-3 text-xs font-bold uppercase tracking-widest text-[#0f0f12] transition-all hover:bg-transparent hover:text-[#ffffff] disabled:pointer-events-none disabled:opacity-40"
        >
          {isLoading ? "COMMIT_IN_PROGRESS..." : "COMMIT_CHANGES //"}
        </button>
      </form>
    </div>
  );
}
