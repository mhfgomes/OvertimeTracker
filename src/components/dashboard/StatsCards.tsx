import { Doc } from "../../../convex/_generated/dataModel";
import { Clock, CalendarDays, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  entries: Doc<"entries">[];
}

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
}

function StatCard({ label, value, sub, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 font-mono text-3xl font-bold tabular-nums text-foreground leading-none">
            {value}
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">{sub}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
    </div>
  );
}

export function StatsCards({ entries }: StatsCardsProps) {
  const totalHours = entries.reduce((sum, e) => sum + e.hours, 0);
  const totalDays = new Set(entries.map((e) => e.date)).size;
  const avgHoursPerDay = totalDays > 0 ? totalHours / totalDays : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        label="Total Hours"
        value={`${totalHours.toFixed(1)}h`}
        sub="this month"
        icon={Clock}
      />
      <StatCard
        label="Days Worked"
        value={String(totalDays)}
        sub="days with overtime"
        icon={CalendarDays}
      />
      <StatCard
        label="Avg per Day"
        value={`${avgHoursPerDay.toFixed(1)}h`}
        sub="on days worked"
        icon={TrendingUp}
      />
    </div>
  );
}
