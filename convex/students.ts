import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByGroup = query({
  args: { group: v.string() },
  handler: async (ctx, { group }) => {
    return ctx.db
      .query("students")
      .filter((q) => q.eq(q.field("group"), group))
      .order("desc")
      .collect();
  },
});

/**
 * Generate random student ID (e.g. GAALINOR37).
 */
function generateStudentId(name: string, group: string) {
  const parts = name.trim().toUpperCase().split(" ");
  const first = parts[0]?.slice(0, 3) || "XXX";
  const last = parts[1]?.slice(0, 3) || "XXX";
  const random = Math.floor(Math.random() * 90 + 10); // 10–99
  return `${group}${first}${last}${random}`;
}

export const add = mutation({
  args: { name: v.string(), group: v.string() },
  handler: async (ctx, { name, group }) => {
    const id = generateStudentId(name, group);
    await ctx.db.insert("students", { id, name, group, score: 0 });
  },
});

export const remove = mutation({
  args: { id: v.id("students") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

export const edit = mutation({
  args: {
    _id: v.id("students"),
    name: v.string(),
    group: v.string(),
    score: v.number(),
  },
  handler: async (ctx, { _id, name, group, score }) => {
    await ctx.db.patch(_id, { _id, name, group, score });
  },
});
