"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
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

  return (
    <div className="flex flex-col items-center gap-sm">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative size-[106px] overflow-hidden rounded-full border border-dashed border-[#d5d7da] bg-secondary transition-colors hover:bg-tertiary"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Profile preview" className="absolute inset-0 size-full object-cover" />
        ) : (
          <span className="flex size-full items-center justify-center">
            <span className="flex size-9 items-center justify-center rounded-[10px] border border-[#d5d7da] bg-primary shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.06)]">
              <Upload className="size-[18px] text-tertiary" aria-hidden="true" />
            </span>
          </span>
        )}
      </button>

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
