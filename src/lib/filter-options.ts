/**
 * Options for a searchable multi-select: drop already-selected values,
 * keep those matching the query (case-insensitive), sorted alphabetically.
 */
export function filterOptions(
  options: readonly string[],
  query: string,
  selected: readonly string[],
): string[] {
  const q = query.trim().toLowerCase();
  const selectedSet = new Set(selected);
  return options
    .filter((option) => !selectedSet.has(option))
    .filter((option) => option.toLowerCase().includes(q))
    .sort((a, b) => a.localeCompare(b));
}
