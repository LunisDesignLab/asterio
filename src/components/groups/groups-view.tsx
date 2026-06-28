"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  ChevronsUpDown,
  LayoutGrid,
  List as ListIcon,
  Lock,
  MoreVertical,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { GROUP_CATEGORIES, UNIT_TYPES } from "@/lib/group-taxonomy";
import { planLimits } from "@/lib/plan-limits";
import type { PlanId } from "@/lib/plans";
import type { Group } from "@/lib/supabase/types";
import { CreateGroupModal } from "./create-group-modal";
import { GroupEmptyState } from "./group-empty-state";
import { deleteGroupsAction } from "@/app/groups/actions";

const ASTERIO_CONFETTI = ["#7f56d9", "#6941c6", "#b692f6", "#d9d6fe", "#53389e"];

function fireAsterioConfetti() {
  confetti({
    particleCount: 110,
    spread: 78,
    startVelocity: 38,
    ticks: 160,
    scalar: 0.95,
    origin: { y: 0.7 },
    colors: ASTERIO_CONFETTI,
  });
}

type View = "list" | "grid";

export function GroupsView({ groups, plan }: { groups: Group[]; plan: PlanId }) {
  const router = useRouter();
  const limits = planLimits(plan);

  const [view, setView] = useState<View>("list");
  const [search, setSearch] = useState("");
  const [unitFilter, setUnitFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [createOpen, setCreateOpen] = useState(false);
  const [newGroupId, setNewGroupId] = useState<string | null>(null);
  const [optimistic, setOptimistic] = useState<Group[]>([]);
  const [busy, setBusy] = useState(false);

  // Merge an optimistically-created group so the new row shows the instant the
  // modal closes — no flash of the empty state while the server refetch lands.
  const allGroups = useMemo(() => {
    const ids = new Set(groups.map((g) => g.id));
    return [...optimistic.filter((g) => !ids.has(g.id)), ...groups];
  }, [optimistic, groups]);
  const canCreate = allGroups.length < limits.maxGroups;

  function handleCreated(group: Group) {
    setOptimistic((prev) => [group, ...prev]);
    setNewGroupId(group.id);
    setCreateOpen(false);
    fireAsterioConfetti();
    router.refresh();
  }

  const filtered = useMemo(
    () =>
      allGroups.filter((g) => {
        if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (unitFilter && !g.units_type.includes(unitFilter)) return false;
        if (categoryFilter && !g.categories.includes(categoryFilter)) return false;
        return true;
      }),
    [allGroups, search, unitFilter, categoryFilter],
  );

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) => (prev.size === filtered.length ? new Set() : new Set(filtered.map((g) => g.id))));
  }

  async function remove(ids: string[]) {
    if (ids.length === 0) return;
    const label = ids.length === 1 ? "this group" : `${ids.length} groups`;
    if (!window.confirm(`Delete ${label}? This can't be undone.`)) return;
    setBusy(true);
    await deleteGroupsAction(ids);
    setBusy(false);
    setSelected(new Set());
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4xl">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-md">
        <div className="flex flex-col gap-xxs">
          <h1 className="text-display-sm font-semibold text-primary">Groups</h1>
          <p className="text-md text-tertiary">Segment your clients for targeted campaigns.</p>
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          disabled={!canCreate}
          className="flex h-10 items-center gap-xs rounded-full bg-brand-solid px-lg text-sm font-semibold text-white shadow-sm transition-opacity disabled:opacity-50"
        >
          <Plus className="size-5" aria-hidden="true" /> Create new group
        </button>
      </div>

      {/* Toolbar */}
      {allGroups.length > 0 && (
        <div className="flex flex-wrap items-center gap-md">
          <div className="flex h-10 min-w-[260px] flex-1 items-center gap-md rounded-full bg-primary px-[14px] shadow-sm">
            <Search className="size-5 text-quaternary" aria-hidden="true" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-placeholder"
            />
          </div>
          <FilterPill value={unitFilter} onChange={setUnitFilter} placeholder="Unit type" options={UNIT_TYPES} />
          <FilterPill value={categoryFilter} onChange={setCategoryFilter} placeholder="All categories" options={GROUP_CATEGORIES} />
          <div className="flex items-center rounded-full border border-secondary bg-[#fafafa] p-[2px]">
            <ViewTab active={view === "list"} onClick={() => setView("list")} icon={ListIcon} label="List view" />
            <ViewTab active={view === "grid"} onClick={() => setView("grid")} icon={LayoutGrid} label="Grid view" />
          </div>
        </div>
      )}

      {/* Bulk bar */}
      {selected.size > 0 && (
        <div className="flex items-center justify-between gap-md rounded-full bg-[#f4f0ff] px-lg py-sm">
          <span className="text-sm font-medium text-brand-secondary">{selected.size} selected</span>
          <div className="flex items-center gap-lg">
            <button type="button" onClick={() => remove(Array.from(selected))} disabled={busy} className="flex items-center gap-xs text-sm font-semibold text-[#d92d20] hover:underline">
              <Trash2 className="size-4" aria-hidden="true" /> Delete
            </button>
            <button type="button" onClick={() => setSelected(new Set())} className="text-sm font-medium text-tertiary hover:text-secondary">
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Body */}
      {allGroups.length === 0 ? (
        <GroupEmptyState maxGroups={limits.maxGroups} onCreate={() => setCreateOpen(true)} />
      ) : filtered.length === 0 ? (
        <NoResults onClear={() => { setSearch(""); setUnitFilter(""); setCategoryFilter(""); }} />
      ) : (
        <div className="overflow-hidden rounded-[24px] bg-[#fdfdfd]">
          <div className="flex items-center gap-md px-2xl pt-lg pb-md">
            <span className="text-sm font-semibold text-primary">All groups</span>
            <span className="rounded-full border border-secondary bg-primary px-md py-[2px] text-xs font-medium text-secondary">
              {filtered.length}
            </span>
          </div>
          {view === "list" ? (
            <GroupList groups={filtered} selected={selected} newGroupId={newGroupId} onToggle={toggleOne} onToggleAll={toggleAll} onDelete={(id) => remove([id])} />
          ) : (
            <GroupGrid groups={filtered} selected={selected} newGroupId={newGroupId} onToggle={toggleOne} onDelete={(id) => remove([id])} />
          )}
        </div>
      )}

      {createOpen && canCreate && (
        <CreateGroupModal onClose={() => setCreateOpen(false)} onCreated={handleCreated} />
      )}
    </div>
  );
}

function FilterPill({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: readonly string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 appearance-none rounded-full bg-primary pl-[14px] pr-9 text-sm text-secondary shadow-sm outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-quaternary" aria-hidden="true" />
    </div>
  );
}

function ViewTab({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof ListIcon; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-center gap-sm rounded-full px-lg py-[6px] text-sm font-semibold transition-colors",
        active ? "border border-primary bg-primary text-primary shadow-sm" : "text-quaternary hover:text-secondary",
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function GroupList({
  groups,
  selected,
  newGroupId,
  onToggle,
  onToggleAll,
  onDelete,
}: {
  groups: Group[];
  selected: Set<string>;
  newGroupId: string | null;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onDelete: (id: string) => void;
}) {
  const allSelected = groups.length > 0 && selected.size === groups.length;
  return (
    <div className="overflow-x-auto bg-primary">
      <table className="w-full text-left">
        <thead>
          <tr className="border-y border-secondary [&>th]:px-3xl [&>th]:py-md [&>th]:text-xs [&>th]:font-semibold [&>th]:text-quaternary">
            <th className="w-[280px]">
              <span className="flex items-center gap-md">
                <input type="checkbox" checked={allSelected} onChange={onToggleAll} aria-label="Select all" className="size-5 rounded-md" />
                <SortLabel>Group name</SortLabel>
              </span>
            </th>
            <th><SortLabel>Members</SortLabel></th>
            <th><SortLabel>Posts</SortLabel></th>
            <th>Unit type</th>
            <th>Categories</th>
            <th>
              <span className="flex items-center gap-xs">
                <Sparkles className="size-4 text-quaternary" aria-hidden="true" />
                <SortLabel>Engagement score</SortLabel>
              </span>
            </th>
            <th className="w-12" />
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => (
            <tr key={g.id} className="h-[72px] border-b border-secondary last:border-b-0 [&>td]:px-3xl [&>td]:py-xl [&>td]:align-middle">
              <td>
                <span className="flex items-center gap-md">
                  <input type="checkbox" checked={selected.has(g.id)} onChange={() => onToggle(g.id)} aria-label={`Select ${g.name}`} className="size-5 rounded-md" />
                  <Thumb group={g} />
                  <span className="flex items-center gap-xs text-sm font-medium text-primary">
                    {g.name}
                    {g.private_mode && <Lock className="size-3.5 text-quaternary" aria-hidden="true" />}
                    {g.id === newGroupId && <NewBadge />}
                  </span>
                </span>
              </td>
              <td className="text-sm font-medium text-primary">0</td>
              <td className="text-sm font-medium text-primary">0</td>
              <td><Badge value={g.units_type[0]} extra={g.units_type.length - 1} tone="purple" /></td>
              <td><Badge value={g.categories[0]} extra={g.categories.length - 1} tone="blue" /></td>
              <td className="min-w-[180px]">
                <span className="flex items-center gap-md">
                  <span className="h-2 flex-1 rounded-full bg-[#e9eaeb]" />
                  <span className="text-sm font-medium text-tertiary">—</span>
                </span>
              </td>
              <td>
                <RowMenu onDelete={() => onDelete(g.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GroupGrid({
  groups,
  selected,
  newGroupId,
  onToggle,
  onDelete,
}: {
  groups: Group[];
  selected: Set<string>;
  newGroupId: string | null;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-xl bg-primary p-2xl sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((g) => (
        <div key={g.id} className="flex flex-col overflow-hidden rounded-xl border border-secondary">
          <div className="relative h-32">
            <Thumb group={g} className="size-full rounded-none" />
            <label className="absolute left-3 top-3 flex size-6 cursor-pointer items-center justify-center rounded-md bg-white/90 shadow">
              <input type="checkbox" checked={selected.has(g.id)} onChange={() => onToggle(g.id)} aria-label={`Select ${g.name}`} />
            </label>
            <div className="absolute right-3 top-3">
              <RowMenu onDelete={() => onDelete(g.id)} light />
            </div>
          </div>
          <div className="flex flex-col gap-md p-lg">
            <span className="flex items-center gap-xs font-semibold text-primary">
              {g.name}
              {g.private_mode && <Lock className="size-3.5 text-quaternary" aria-hidden="true" />}
              {g.id === newGroupId && <NewBadge />}
            </span>
            <span className="flex flex-wrap gap-xs">
              <Badge value={g.units_type[0]} extra={g.units_type.length - 1} tone="purple" />
              <Badge value={g.categories[0]} extra={g.categories.length - 1} tone="blue" />
            </span>
            <p className="text-xs text-tertiary">0 members · 0 posts</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SortLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-xs">
      {children}
      <ChevronsUpDown className="size-3 text-quaternary" aria-hidden="true" />
    </span>
  );
}

function Thumb({ group, className }: { group: Group; className?: string }) {
  if (group.thumbnail_url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={group.thumbnail_url} alt="" className={cn("size-10 rounded-xl border border-[#0000000a] object-cover", className)} />;
  }
  return (
    <span className={cn("flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7f56d9] to-[#53389e] text-white", className)}>
      <Users className="size-4" aria-hidden="true" />
    </span>
  );
}

function NewBadge() {
  return (
    <span className="rounded-full bg-[#f4f0ff] px-md py-[1px] text-[11px] font-semibold text-brand-secondary">
      New
    </span>
  );
}

function Badge({ value, extra, tone }: { value?: string; extra: number; tone: "purple" | "blue" }) {
  if (!value) return <span className="text-sm text-tertiary">—</span>;
  const styles =
    tone === "purple"
      ? "border-[#d9d6fe] bg-[#f4f3ff] text-[#5925dc]"
      : "border-[#b2ddff] bg-[#eff8ff] text-[#175cd3]";
  return (
    <span className="flex items-center gap-xs">
      <span className={cn("rounded-full border px-md py-[2px] text-xs font-medium", styles)}>{value}</span>
      {extra > 0 && <span className="text-xs text-tertiary">+{extra}</span>}
    </span>
  );
}

function RowMenu({ onDelete, light }: { onDelete: () => void; light?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Group actions"
        className={cn(
          "flex size-8 items-center justify-center rounded-md transition-colors",
          light ? "bg-white/90 text-secondary shadow hover:bg-white" : "text-quaternary hover:bg-secondary hover:text-tertiary",
        )}
      >
        <MoreVertical className="size-5" aria-hidden="true" />
      </button>
      {open && (
        <>
          <button type="button" className="fixed inset-0 z-10 cursor-default" aria-hidden="true" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-lg border border-secondary bg-primary py-xs shadow-lg">
            <button type="button" onClick={() => { setOpen(false); onDelete(); }} className="flex w-full items-center gap-sm px-lg py-sm text-left text-sm text-[#d92d20] hover:bg-secondary">
              <Trash2 className="size-4" aria-hidden="true" /> Delete group
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function NoResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center gap-md rounded-[24px] bg-[#fdfdfd] py-7xl text-center">
      <p className="text-md text-tertiary">No groups match your filters.</p>
      <button type="button" onClick={onClear} className="text-sm font-semibold text-brand-secondary">
        Clear filters
      </button>
    </div>
  );
}
