import { query } from "./_generated/server";
import { ensureAuthenticated } from "./ensureAuthenticated";

export const get = query({
  args: {},
  handler: async (ctx) => {
    await ensureAuthenticated(ctx);
    return await ctx.db.query("tasks").collect();
  },
});
