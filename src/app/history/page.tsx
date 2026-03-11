"use client";

import { useMemo, useState } from "react";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Doc } from "../../../convex/_generated/dataModel";
import { AppShell } from "@/components/layout/AppShell";
import { EntryTable } from "@/components/entries/EntryTable";
import { EntryDialog } from "@/components/entries/EntryDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

type SortKey = "date" | "hours";
type SortDir = "asc" | "desc";

export default function HistoryPage() {
  const { isAuthenticated } = useConvexAuth();
  const allEntries = useQuery(api.entries.getAllEntries, isAuthenticated ? {} : "skip");

  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [filterMonth, setFilterMonth] = useState<string>("all");

  const months = useMemo<string[]>(() => {
    if (!allEntries) return [];
    const set = new Set(
      (allEntries as Array<{ date: string }>).map((e) => e.date.slice(0, 7))
    );
    return Array.from(set).sort().reverse();
  }, [allEntries]);

  const filtered = useMemo(() => {
    if (!allEntries) return [];
    const base =
      filterMonth === "all"
        ? allEntries
        : allEntries.filter((e: { date: string }) =>
            e.date.startsWith(filterMonth)
          );

    return [...base].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [allEntries, filterMonth, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">History</h1>
          <EntryDialog />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Month</label>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All time</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="h-4 w-px bg-border" />

          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground mr-1">Sort</span>
            {(["date", "hours"] as SortKey[]).map((key) => (
              <Button
                key={key}
                variant={sortKey === key ? "secondary" : "ghost"}
                size="sm"
                onClick={() => toggleSort(key)}
                className="h-7 gap-1 px-2.5 text-xs capitalize"
              >
                {key}
                {sortKey === key && (
                  <ArrowUpDown className="h-3 w-3 opacity-60" />
                )}
              </Button>
            ))}
          </div>

          {allEntries && (
            <span className="ml-auto text-xs text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
            </span>
          )}
        </div>

        {/* Table */}
        {allEntries === undefined ? (
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden divide-y divide-border">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3.5">
                <Skeleton className="h-3.5 w-28 rounded" />
                <Skeleton className="h-3.5 w-10 rounded" />
                <Skeleton className="h-3.5 w-48 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <EntryTable entries={filtered} />
        )}

      </div>
    </AppShell>
  );
}
