"use client";

import { useRef, useState } from "react";
import { Pencil, Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/cn";

const MAX_BYTES = 3 * 1024 * 1024;
const ACCEPTED = ["image/png", "image/jpeg"];

interface AvatarUploadProps {
  onChange?: (file: File | null) => void;
}

export function AvatarUpload({ onChange }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function pick() {
    inputRef.current?.click();
  }

  function handleFile(file?: File) {
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      setError("Please upload a PNG or JPG image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Image must be 3MB or smaller.");
      return;
    }
    setError(null);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    onChange?.(file);
  }

  function remove() {
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
    onChange?.(null);
  }

  return (
    <div className="flex flex-col items-center gap-sm">
      <div className="relative size-[106px] overflow-hidden rounded-full">
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Profile preview"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-md bg-[rgba(10,13,18,0.55)] opacity-0 transition-opacity hover:opacity-100">
              <button
                type="button"
                onClick={pick}
                aria-label="Change photo"
                className="flex size-9 items-center justify-center rounded-full bg-white/95 text-secondary transition-colors hover:bg-white"
              >
                <Pencil className="size-[18px]" />
              </button>
              <button
                type="button"
                onClick={remove}
                aria-label="Remove photo"
                className="flex size-9 items-center justify-center rounded-full bg-white/95 text-[#d92d20] transition-colors hover:bg-white"
              >
                <Trash2 className="size-[18px]" />
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={pick}
            aria-label="Upload profile picture"
            className="flex size-full items-center justify-center rounded-full border border-dashed border-[#d5d7da] bg-secondary transition-colors hover:bg-tertiary"
          >
            <span className="flex size-9 items-center justify-center rounded-[10px] border border-[#d5d7da] bg-primary shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.06)]">
              <Upload className="size-[18px] text-tertiary" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <p className={cn("text-center text-sm", error ? "text-[#d92d20]" : "text-placeholder")}>
        {error ?? "Upload profile picture. PNG, JPG, max 3MB"}
      </p>
    </div>
  );
}
