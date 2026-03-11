"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { format, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { AppShell } from "@/components/layout/AppShell";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { MonthlyBarChart } from "@/components/dashboard/MonthlyBarChart";
import { RecentEntries } from "@/components/dashboard/RecentEntries";
import { EntryDialog } from "@/components/entries/EntryDialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function toYearMonth(date: Date): string {
  return format(date, "yyyy-MM");
}

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const yearMonth = toYearMonth(selectedMonth);

  const entries = useQuery(api.entries.getEntriesForMonth, { yearMonth });
  const recentEntries = useQuery(api.entries.getRecentEntries, {});

  const isLoading = entries === undefined || recentEntries === undefined;
  const isCurrentMonth =
    toYearMonth(addMonths(selectedMonth, 1)) > toYearMonth(new Date());

  return (
    <AppShell>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setSelectedMonth((m) => subMonths(m, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[120px] text-center text-sm font-semibold">
              {format(selectedMonth, "MMMM yyyy")}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setSelectedMonth((m) => addMonths(m, 1))}
              disabled={isCurrentMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <EntryDialog />
        </div>

        {/* Stats */}
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-[104px] rounded-xl" />
            ))}
          </div>
        ) : (
          <StatsCards entries={entries} />
        )}

        {/* Chart */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-5 py-3.5">
            <h2 className="text-sm font-semibold text-foreground">
              Hours by Day
            </h2>
          </div>
          <div className="p-4 pt-5">
            {isLoading ? (
              <Skeleton className="h-[200px] w-full rounded" />
            ) : (
              <MonthlyBarChart entries={entries} yearMonth={yearMonth} />
            )}
          </div>
        </div>

        {/* Recent entries */}
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="border-b border-border px-5 py-3.5">
            <h2 className="text-sm font-semibold text-foreground">
              Recent Entries
            </h2>
          </div>
          {isLoading ? (
            <div className="divide-y divide-border">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3.5">
                  <div className="space-y-1.5">
                    <Skeleton className="h-3.5 w-32 rounded" />
                    <Skeleton className="h-3 w-20 rounded" />
                  </div>
                  <Skeleton className="h-4 w-10 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <RecentEntries entries={recentEntries} />
          )}
        </div>

      </div>
    </AppShell>
  );
}
