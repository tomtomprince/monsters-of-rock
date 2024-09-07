import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    // From Clerk auth docs https://docs.convex.dev/auth/clerk
    // If this is used outside of a <Authenticated> component, it will throw an error
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db.query("tasks").collect();
  },
});
