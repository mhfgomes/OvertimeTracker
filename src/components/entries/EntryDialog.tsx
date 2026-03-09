"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EntryForm } from "./EntryForm";

interface EntryDialogProps {
  entryId?: Id<"entries">;
  defaultValues?: {
    date: string;
    hours: number;
    description?: string;
  };
}

export function EntryDialog({ entryId, defaultValues }: EntryDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {entryId ? (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setOpen(true)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      ) : (
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Entry
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{entryId ? "Edit Entry" : "Add Overtime Entry"}</DialogTitle>
          </DialogHeader>
          <EntryForm
            entryId={entryId}
            defaultValues={defaultValues}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
