function Laurel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 96" fill="currentColor" className={className} aria-hidden="true">
      <path
        d="M37 93 C20 78 14 50 28 9"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="22" cy="74" rx="7.5" ry="3.3" transform="rotate(-32 22 74)" />
      <ellipse cx="17.5" cy="61" rx="8" ry="3.5" transform="rotate(-48 17.5 61)" />
      <ellipse cx="15" cy="47" rx="8" ry="3.5" transform="rotate(-63 15 47)" />
      <ellipse cx="16" cy="33" rx="7.5" ry="3.3" transform="rotate(-78 16 33)" />
      <ellipse cx="21" cy="20" rx="6.5" ry="3" transform="rotate(-92 21 20)" />
    </svg>
  );
}

export function RecommendedBadge({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-md text-[#C8982E]">
      <Laurel className="h-8 w-auto" />
      <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.08em] text-secondary">
        {text}
      </span>
      <Laurel className="h-8 w-auto -scale-x-100" />
    </div>
  );
}
