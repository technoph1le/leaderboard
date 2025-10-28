import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  students: defineTable({
    id: v.string(),
    group: v.string(),
    name: v.string(),
    score: v.number(),
  }),
});
