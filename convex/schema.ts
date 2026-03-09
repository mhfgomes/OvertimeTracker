import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  entries: defineTable({
    userId: v.string(),
    date: v.string(),        // "YYYY-MM-DD"
    hours: v.number(),       // supports decimals e.g. 1.5
    description: v.optional(v.string()),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_date", ["userId", "date"]),
});
