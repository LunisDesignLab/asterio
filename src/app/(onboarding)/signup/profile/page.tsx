"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiCombobox } from "@/components/ui/multi-combobox";
import { AvatarUpload } from "@/components/ui/avatar-upload";

// Provisional, UAE-relevant list — confirm with Adrian.
const LANGUAGES = [
  "English",
  "Arabic",
  "Hindi",
  "Urdu",
  "Russian",
  "Farsi",
  "French",
  "Mandarin",
  "Tagalog",
  "Spanish",
] as const;

function ProfileContent() {
  const router = useRouter();
  const params = useSearchParams();
  const role = params.get("role") ?? "broker";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    languages?: string;
  }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!firstName.trim()) next.firstName = "Enter your first name.";
    if (!lastName.trim()) next.lastName = "Enter your last name.";
    if (languages.length === 0) next.languages = "Select at least one language.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Phase B: persist profile (+ upload avatar to storage) here.
    router.push(`/signup/plan?role=${role}`);
  }

  return (
    <div className="flex w-full max-w-[460px] flex-col items-center gap-4xl">
      <div className="flex w-full flex-col gap-3xl">
        <div className="flex flex-col gap-sm text-center">
          <h1 className="text-display-md font-semibold tracking-[-0.72px] text-primary">
            Complete your profile
          </h1>
          <p className="text-md text-tertiary">
            Add your professional details to personalize your dashboard.
          </p>
        </div>
        <AvatarUpload />
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-4xl">
        <div className="flex w-full flex-col gap-3xl">
          <Input
            id="firstName"
            label="First name"
            placeholder="e.g. Mohammed"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={errors.firstName}
          />
          <Input
            id="lastName"
            label="Last name"
            placeholder="e.g. Al Mansoori"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastName}
          />
          <Input
            id="company"
            label="Company Name (optional)"
            placeholder="e.g. Elite Real Estate L.L.C"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <div className="flex flex-col gap-sm">
            <MultiCombobox
              label="Preferred language"
              placeholder="Select at least one language"
              options={LANGUAGES}
              value={languages}
              error={!!errors.languages}
              onChange={(v) => {
                setLanguages(v);
                if (errors.languages) setErrors((p) => ({ ...p, languages: undefined }));
              }}
            />
            {errors.languages && <p className="text-sm text-[#d92d20]">{errors.languages}</p>}
          </div>
        </div>

        <div className="flex flex-col items-center gap-lg">
          <Button type="submit" variant="primary" fullWidth>
            Continue
          </Button>
          <button
            type="button"
            onClick={() => router.push("/signup/verify")}
            className="flex items-center justify-center gap-sm px-xl py-[10px] text-md font-semibold text-tertiary"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
            Back to previous step
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense>
      <ProfileContent />
    </Suspense>
  );
}
