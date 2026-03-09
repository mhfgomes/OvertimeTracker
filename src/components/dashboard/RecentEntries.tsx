import { format, parseISO } from "date-fns";
import { Doc } from "../../../convex/_generated/dataModel";

interface RecentEntriesProps {
  entries: Doc<"entries">[];
}

export function RecentEntries({ entries }: RecentEntriesProps) {
  if (entries.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-muted-foreground">
          No entries yet — add your first overtime entry.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {entries.map((entry) => (
        <li
          key={entry._id}
          className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {format(parseISO(entry.date), "EEEE, MMM d")}
            </p>
            {entry.description && (
              <p className="mt-0.5 text-xs text-muted-foreground truncate">
                {entry.description}
              </p>
            )}
          </div>
          <span className="shrink-0 font-mono text-sm font-semibold tabular-nums text-primary">
            {entry.hours.toFixed(1)}h
          </span>
        </li>
      ))}
    </ul>
  );
}
