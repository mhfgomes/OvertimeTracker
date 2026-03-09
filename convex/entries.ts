import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

function requireUser(ctx: { auth: { getUserIdentity: () => Promise<{ subject: string } | null> } }) {
  return ctx.auth.getUserIdentity().then((identity) => {
    if (!identity) throw new ConvexError("Unauthenticated");
    return identity;
  });
}

export const getEntriesForMonth = query({
  args: { yearMonth: v.string() },
  handler: async (ctx, { yearMonth }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");

    const start = `${yearMonth}-01`;
    const end = `${yearMonth}-31`;

    const entries = await ctx.db
      .query("entries")
      .withIndex("by_userId_date", (q) =>
        q.eq("userId", identity.subject).gte("date", start).lte("date", end)
      )
      .collect();

    return entries;
  },
});

export const getRecentEntries = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 5 }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");

    const entries = await ctx.db
      .query("entries")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .take(limit);

    return entries;
  },
});

export const getAllEntries = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");

    const entries = await ctx.db
      .query("entries")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();

    return entries;
  },
});

export const createEntry = mutation({
  args: {
    date: v.string(),
    hours: v.number(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, { date, hours, description }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");

    if (hours <= 0 || hours > 24) {
      throw new ConvexError("Hours must be between 0 and 24");
    }

    return await ctx.db.insert("entries", {
      userId: identity.subject,
      date,
      hours,
      description,
    });
  },
});

export const updateEntry = mutation({
  args: {
    id: v.id("entries"),
    date: v.string(),
    hours: v.number(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, { id, date, hours, description }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");

    const entry = await ctx.db.get(id);
    if (!entry || entry.userId !== identity.subject) {
      throw new ConvexError("Not found or unauthorized");
    }

    if (hours <= 0 || hours > 24) {
      throw new ConvexError("Hours must be between 0 and 24");
    }

    await ctx.db.patch(id, { date, hours, description });
  },
});

export const deleteEntry = mutation({
  args: { id: v.id("entries") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");

    const entry = await ctx.db.get(id);
    if (!entry || entry.userId !== identity.subject) {
      throw new ConvexError("Not found or unauthorized");
    }

    await ctx.db.delete(id);
  },
});
