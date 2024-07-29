import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { webScrape } from "../services/webScrap";
import { getSummary } from "../services/open-ai";
import { extractNameFromUrl } from "~/utils/extractNameFromUrl";
import { recipes } from "~/server/db/schema";
import { desc, eq } from "drizzle-orm";

const RECENTLY_ADDED_LIMIT = 3;
const SUMMARIES_DAILY_LIMIT = 5;

export const recipeRouter = createTRPCRouter({
  getRecentlyAdded: protectedProcedure.query(async ({ ctx }) => {
    const queryResult = await ctx.db
      .select()
      .from(recipes)
      .orderBy(desc(recipes.createdAt))
      .limit(RECENTLY_ADDED_LIMIT);

    return queryResult.map((result) => result.name);
  }),
  scrapeRecipe: protectedProcedure
    .input(z.object({ link: z.string().url() }))
    .mutation(async ({ input, ctx }) => {
      const recipeName = extractNameFromUrl(input.link);
      const queryResult = await ctx.db
        .select()
        .from(recipes)
        .where(eq(recipes.name, recipeName));
      const result = queryResult[0];

      if (result?.recipe) {
        return {
          recipeName: result.name,
        };
      }
      const fullRecipe = await webScrape(input.link);

      await ctx.db.insert(recipes).values({
        name: recipeName,
        url: input.link,
        recipe: fullRecipe,
        createdBy: ctx.session.user.id,
      });

      return {
        recipeName: recipeName,
      };
    }),

  getSummary: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const queryResult = await ctx.db
        .select()
        .from(recipes)
        .where(eq(recipes.name, input.name));

      const result = queryResult[0];

      if (result?.summary) {
        return {
          summary: result.summary,
        };
      }

      if (!result?.recipe) {
        return {
          summary: "No recipe found",
        };
      }

      const summary = await getSummary(result.recipe);

      await ctx.db
        .update(recipes)
        .set({ summary })
        .where(eq(recipes.name, input.name));

      const updatedResult = await ctx.db
        .select()
        .from(recipes)
        .where(eq(recipes.name, input.name));

      return {
        summary: updatedResult[0]?.summary ?? "No summary found",
      };
    }),
  getSummariesLeftForUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const queryResult = await ctx.db
      .select()
      .from(recipes)
      .where(eq(recipes.createdBy, userId));

    return SUMMARIES_DAILY_LIMIT - queryResult.length;
  }),
});
