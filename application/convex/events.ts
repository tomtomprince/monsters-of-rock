import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
export const get = query({
  args: {},
  handler: async (ctx) => {
    // We allow anonymous users to read events
    return await ctx.db.query("events").collect();
  },
});

export const createEvent = mutation({
  args: { title: v.string(), description: v.string() },
  handler: async (ctx, args) => {
    const newEventId = await ctx.db.insert("events", { title: args.title, description: args.description });
    return newEventId;
  },
});
