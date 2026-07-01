import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { dishId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("recs")
      .withIndex("by_dish", (q) => q.eq("dishId", args.dishId))
      .order("desc")
      .collect();
  },
});

export const add = mutation({
  args: {
    dishId: v.string(),
    name: v.string(),
    neighborhood: v.optional(v.string()),
    note: v.optional(v.string()),
    by: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("recs", args);
  },
});

export const remove = mutation({
  args: { id: v.id("recs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
