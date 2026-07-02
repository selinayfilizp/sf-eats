import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  recs: defineTable({
    dishId: v.string(),
    name: v.string(),
    neighborhood: v.optional(v.string()),
    note: v.optional(v.string()),
    by: v.optional(v.string()),
    // undefined = legacy rec, treated as approved
    status: v.optional(v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected"))),
    votes: v.optional(v.number()),
  }).index("by_dish", ["dishId"]),

  reports: defineTable({
    dishId: v.string(),
    spotName: v.string(),
    kind: v.union(v.literal("closed"), v.literal("wrong-info"), v.literal("other")),
    note: v.optional(v.string()),
    resolved: v.optional(v.boolean()),
  }),
});
