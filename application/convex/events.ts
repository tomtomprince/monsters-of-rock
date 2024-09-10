import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { ensureAuthenticated } from "./ensureAuthenticated";

export const get = query({
  args: {},
  handler: async (ctx) => {
    // We allow anonymous users to read events
    return await ctx.db.query("events").collect();
  },
});

export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    startDateTime: v.string(),
    endDateTime: v.string(),
    timezone: v.string(),
    latitude: v.number(),
    longitude: v.number(),
  },
  handler: async (ctx, args) => {
    const createdBy = await ensureAuthenticated(ctx);
    const newEventId = await ctx.db.insert("events", {
      title: args.title,
      description: args.description,
      startDateTime: args.startDateTime,
      endDateTime: args.endDateTime,
      timezone: args.timezone,
      latitude: args.latitude,
      longitude: args.longitude,
      createdBy: createdBy?.email,
    });
    return newEventId;
  },
});
