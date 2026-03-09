"use client";

import { Doc } from "../../../convex/_generated/dataModel";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EntryTableRow } from "./EntryTableRow";

interface EntryTableProps {
  entries: Doc<"entries">[];
}

export function EntryTable({ entries }: EntryTableProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center shadow-sm">
        <p className="text-sm text-muted-foreground">No entries found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-xs font-semibold text-muted-foreground">Date</TableHead>
            <TableHead className="text-xs font-semibold text-muted-foreground w-24">Hours</TableHead>
            <TableHead className="text-xs font-semibold text-muted-foreground">Description</TableHead>
            <TableHead className="w-24" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <EntryTableRow key={entry._id} entry={entry} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
