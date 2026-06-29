import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  recs: defineTable({
    dishId: v.string(),
    name: v.string(),
    neighborhood: v.optional(v.string()),
    note: v.optional(v.string()),
    by: v.optional(v.string()),
  }).index("by_dish", ["dishId"]),
});
