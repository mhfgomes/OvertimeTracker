"use client";

import { getDaysInMonth, parseISO } from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Doc } from "../../../convex/_generated/dataModel";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface MonthlyBarChartProps {
  entries: Doc<"entries">[];
  yearMonth: string;
}

const chartConfig = {
  hours: {
    label: "Hours",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig;

export function MonthlyBarChart({ entries, yearMonth }: MonthlyBarChartProps) {
  const [year, month] = yearMonth.split("-").map(Number);
  const daysInMonth = getDaysInMonth(new Date(year, month - 1));

  const hoursMap: Record<number, number> = {};
  for (const entry of entries) {
    const day = parseISO(entry.date).getDate();
    hoursMap[day] = (hoursMap[day] ?? 0) + entry.hours;
  }

  const data = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    hours: hoursMap[i + 1] ?? 0,
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart data={data} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 11 }}
          interval={4}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 11 }}
          allowDecimals={false}
          width={36}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="hours"
          fill="var(--color-hours)"
          radius={[3, 3, 0, 0]}
          maxBarSize={18}
        />
      </BarChart>
    </ChartContainer>
  );
}
