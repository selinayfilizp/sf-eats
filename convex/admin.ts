import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// All admin functions require the ADMIN_KEY env var (set via `npx convex env set`).
// The key is verified server-side so the public client bundle grants nothing.
function checkKey(key: string) {
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    throw new Error("Unauthorized");
  }
}

export const listAll = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    checkKey(args.key);
    return await ctx.db.query("recs").order("desc").collect();
  },
});

export const setStatus = mutation({
  args: {
    key: v.string(),
    id: v.id("recs"),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
  },
  handler: async (ctx, args) => {
    checkKey(args.key);
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { key: v.string(), id: v.id("recs") },
  handler: async (ctx, args) => {
    checkKey(args.key);
    await ctx.db.delete(args.id);
  },
});
