"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  date: z.string().min(1, "Date is required"),
  hours: z
    .number()
    .min(0.25, "Minimum 0.25 hours")
    .max(24, "Maximum 24 hours"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EntryFormProps {
  entryId?: Id<"entries">;
  defaultValues?: FormValues;
  onSuccess?: () => void;
}

export function EntryForm({ entryId, defaultValues, onSuccess }: EntryFormProps) {
  const createEntry = useMutation(api.entries.createEntry);
  const updateEntry = useMutation(api.entries.updateEntry);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      date: new Date().toISOString().split("T")[0],
      hours: 1,
      description: "",
    },
  });

  async function onSubmit(values: FormValues) {
    if (entryId) {
      await updateEntry({ id: entryId, ...values });
    } else {
      await createEntry(values);
    }
    onSuccess?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-1">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Date
              </FormLabel>
              <FormControl>
                <Input type="date" className="font-mono text-sm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Hours
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.25"
                  min="0.25"
                  max="24"
                  className="font-mono text-sm"
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                  onBlur={field.onBlur}
                  name={field.name}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Description
                <span className="ml-1 normal-case font-normal text-muted-foreground/60">
                  (optional)
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="What were you working on?"
                  className="text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full mt-2"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? "Saving..."
            : entryId
            ? "Update Entry"
            : "Add Entry"}
        </Button>
      </form>
    </Form>
  );
}
