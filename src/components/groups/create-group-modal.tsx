"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ImagePlus, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notification } from "@/components/ui/notification";
import { cn } from "@/lib/cn";
import { GROUP_CATEGORIES, UNIT_TYPES } from "@/lib/group-taxonomy";
import type { Group } from "@/lib/supabase/types";
import { createGroupAction } from "@/app/groups/actions";

const ACCEPTED = ["image/png", "image/jpeg", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;
const DRAFT_KEY = "asterio_group_draft";

type Draft = { name: string; description: string; units: string[]; categories: string[]; privateMode: boolean };

function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

export function CreateGroupModal({ onClose, onCreated }: { onClose: () => void; onCreated: (group: Group) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const draft = useMemo(() => loadDraft(), []);

  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState(draft?.name ?? "");
  const [description, setDescription] = useState(draft?.description ?? "");
  const [units, setUnits] = useState<string[]>(draft?.units ?? []);
  const [categories, setCategories] = useState<string[]>(draft?.categories ?? []);
  const [privateMode, setPrivateMode] = useState(draft?.privateMode ?? false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | undefined>();
  const [showDiscard, setShowDiscard] = useState(false);

  const isDirty = !!(name.trim() || description.trim() || units.length || categories.length || preview || privateMode);

  function attemptClose() {
    if (isDirty) setShowDiscard(true);
    else onClose();
  }

  // Lock scroll + close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (showDiscard) setShowDiscard(false);
      else if (isDirty) setShowDiscard(true);
      else onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [showDiscard, isDirty, onClose]);

  function saveDraft() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ name, description, units, categories, privateMode }));
    } catch {
      // ignore
    }
  }

  function clearDraft() {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
  }

  function toggle(list: string[], value: string, set: (v: string[]) => void) {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function handleFile(file?: File) {
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      setError("Thumbnail must be a PNG, JPG or WebP image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Thumbnail must be 5MB or smaller.");
      return;
    }
    setError(null);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }

  function removePreview() {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setNameError("Enter a group name.");
      return;
    }
    setSubmitting(true);
    const result = await createGroupAction({ name, description, private_mode: privateMode, units_type: units, categories });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    clearDraft();
    onCreated(result.group);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0d12]/60 p-4 backdrop-blur-sm" onClick={attemptClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-group-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-[480px] flex-col overflow-hidden rounded-2xl bg-primary shadow-2xl"
      >
        <div className="flex items-center justify-between gap-md px-3xl pt-3xl pb-lg">
          <div className="flex items-center gap-md">
            <span className="flex size-10 items-center justify-center rounded-[10px] bg-secondary text-tertiary">
              <Users className="size-5" aria-hidden="true" />
            </span>
            <h2 id="create-group-title" className="text-lg font-semibold text-primary">
              Create new group
            </h2>
          </div>
          <button type="button" onClick={attemptClose} aria-label="Close" className="text-quaternary hover:text-tertiary">
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex flex-col gap-xl px-3xl pb-xl">
            {error && <Notification variant="error" onClose={() => setError(null)}>{error}</Notification>}

            {/* Thumbnail */}
            <div className="flex flex-col gap-sm">
              <span className="text-sm font-medium text-secondary">Group thumbnail</span>
              <div className="relative h-[120px] overflow-hidden rounded-xl border border-dashed border-secondary bg-secondary/40">
                {preview ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="" className="size-full object-cover" />
                    <button
                      type="button"
                      onClick={removePreview}
                      aria-label="Remove thumbnail"
                      className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-[#d92d20] text-white shadow-md transition-transform hover:scale-105"
                    >
                      <X className="size-4" aria-hidden="true" />
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={() => fileRef.current?.click()} className="flex size-full flex-col items-center justify-center gap-xs px-lg text-center transition-colors hover:border-brand-secondary">
                    <ImagePlus className="size-5 text-quaternary" aria-hidden="true" />
                    <p className="text-sm text-tertiary">
                      <span className="font-semibold text-brand-secondary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-quaternary">PNG, JPG or WebP (max. 800×400px)</p>
                  </button>
                )}
              </div>
              <input ref={fileRef} type="file" accept={ACCEPTED.join(",")} className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
            </div>

            <Input
              id="group-name"
              label="Group name"
              placeholder="e.g. Luxury Penthouses"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError(undefined);
              }}
              error={nameError}
            />

            <div className="flex flex-col gap-sm">
              <label htmlFor="group-description" className="text-sm font-medium text-secondary">
                Group description <span className="text-tertiary">(optional)</span>
              </label>
              <textarea
                id="group-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter details…"
                rows={3}
                className="w-full rounded-md border border-primary bg-primary px-[14px] py-[10px] text-md text-primary shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] outline-none placeholder:text-placeholder focus:border-[#7f56d9] focus:shadow-[0px_0px_0px_4px_rgba(127,86,217,0.20)]"
              />
            </div>

            <ChipGroup label="Units type" options={UNIT_TYPES} selected={units} onToggle={(v) => toggle(units, v, setUnits)} />
            <ChipGroup label="Group categories" options={GROUP_CATEGORIES} selected={categories} onToggle={(v) => toggle(categories, v, setCategories)} />

            {/* Private mode */}
            <div className="flex items-start justify-between gap-lg rounded-xl border border-secondary p-lg">
              <div className="flex flex-col gap-xxs">
                <span className="text-sm font-medium text-primary">Private mode</span>
                <span className="text-sm text-tertiary">Members can&apos;t see each other; comments are visible only to you.</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={privateMode}
                aria-label="Private mode"
                onClick={() => setPrivateMode((v) => !v)}
                className={cn("relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors", privateMode ? "bg-brand-solid" : "bg-[#d5d7da]")}
              >
                <span className={cn("absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform", privateMode && "translate-x-4")} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-md border-t border-secondary px-3xl py-xl">
            <button type="button" onClick={attemptClose} className="px-lg py-[10px] text-sm font-semibold text-tertiary transition-colors hover:text-secondary">
              Cancel
            </button>
            <Button type="submit" variant="primary" disabled={submitting || !name.trim()}>
              {submitting ? "Creating…" : "Create group"}
            </Button>
          </div>
        </form>
      </div>

      {/* Discard / save-as-draft confirmation */}
      {showDiscard && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0a0d12]/40 p-4" onClick={() => setShowDiscard(false)}>
          <div onClick={(e) => e.stopPropagation()} className="flex w-full max-w-[360px] flex-col gap-xl rounded-2xl bg-primary p-3xl shadow-2xl">
            <div className="flex flex-col gap-xs">
              <h3 className="text-lg font-semibold text-primary">Discard this group?</h3>
              <p className="text-sm text-tertiary">Your group isn&apos;t saved yet. Save it as a draft to finish later, or discard it.</p>
            </div>
            <div className="flex flex-col gap-md">
              <Button variant="primary" fullWidth onClick={() => { saveDraft(); onClose(); }}>
                Save as draft
              </Button>
              <button type="button" onClick={() => { clearDraft(); onClose(); }} className="rounded-full py-[10px] text-sm font-semibold text-[#d92d20] transition-colors hover:bg-secondary">
                Discard
              </button>
              <button type="button" onClick={() => setShowDiscard(false)} className="py-[6px] text-sm font-medium text-tertiary transition-colors hover:text-secondary">
                Keep editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChipGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-sm">
      <span className="text-sm font-medium text-secondary">{label}</span>
      <div className="flex flex-wrap gap-sm">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-md py-[6px] text-sm font-medium transition-colors",
                active ? "border-brand-secondary bg-[#f4f0ff] text-brand-secondary" : "border-secondary text-secondary hover:border-primary",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
