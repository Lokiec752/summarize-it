import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { webScrape } from "../services/webScrap";
import { getSummary } from "../services/open-ai";
import { extractNameFromUrl } from "~/utils/extractNameFromUrl";
import { recipes } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const recipeRouter = createTRPCRouter({
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
      });

      return {
        recipeName: recipeName,
      };
    }),

  getSummary: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      console.log(input);
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
});
