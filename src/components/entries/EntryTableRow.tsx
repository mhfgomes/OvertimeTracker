"use client";

import { format, parseISO } from "date-fns";
import { Doc } from "../../../convex/_generated/dataModel";
import { TableCell, TableRow } from "@/components/ui/table";
import { EntryDialog } from "./EntryDialog";
import { DeleteEntryDialog } from "./DeleteEntryDialog";

interface EntryTableRowProps {
  entry: Doc<"entries">;
}

export function EntryTableRow({ entry }: EntryTableRowProps) {
  return (
    <TableRow className="border-border group">
      <TableCell className="text-sm font-medium">
        {format(parseISO(entry.date), "MMM d, yyyy")}
      </TableCell>
      <TableCell className="font-mono text-sm font-semibold tabular-nums text-primary">
        {entry.hours.toFixed(1)}h
      </TableCell>
      <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
        {entry.description ?? <span className="text-muted-foreground/40">—</span>}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <EntryDialog
            entryId={entry._id}
            defaultValues={{
              date: entry.date,
              hours: entry.hours,
              description: entry.description,
            }}
          />
          <DeleteEntryDialog entryId={entry._id} />
        </div>
      </TableCell>
    </TableRow>
  );
}
