import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    // We allow anonymous users to read events
    return await ctx.db.query("events").collect();
  },
});
