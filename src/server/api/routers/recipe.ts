import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { webScrape } from "../services/webScrap";
import { getSummary } from "../services/open-ai";

export const recipeRouter = createTRPCRouter({
  postLink: protectedProcedure
    .input(z.object({ link: z.string().url() }))
    .mutation(async ({ input }) => {
      const fullRecipe = await webScrape(input.link);
      const recipe = await getSummary(fullRecipe);
      return {
        recipe,
      };
    }),
});
