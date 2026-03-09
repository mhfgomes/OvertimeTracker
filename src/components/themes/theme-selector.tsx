"use client";

import * as React from "react";
import { Palette } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { THEMES, type Theme } from "./theme.config";
import { useThemeConfig } from "./active-theme";

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig();

  return (
    <Select value={activeTheme} onValueChange={(v) => setActiveTheme(v as Theme)}>
      <SelectTrigger className="h-8 w-[140px] gap-1.5 text-xs">
        <Palette className="size-3.5 shrink-0 text-muted-foreground" />
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent align="end">
        {THEMES.map((theme) => (
          <SelectItem key={theme.name} value={theme.name} className="text-xs">
            {theme.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
