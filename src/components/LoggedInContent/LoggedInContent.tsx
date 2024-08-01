import { api } from "~/utils/api";
import Input from "../Input";

export default function LoggedInContent() {
  const utils = api.useUtils();
  const {
    mutate: getSummary,
    isPending: isGettingSummary,
    isError: isSummaryError,
    data,
  } = api.recipe.getSummary.useMutation({
    onSuccess: async () => {
      await utils.recipe.getSummariesLeftForUser.invalidate();
      await utils.recipe.getRecentlyAdded.invalidate();
    },
  });
  const {
    mutate: scrapeRecipe,
    isPending: isScraping,
    isError: isScrapeError,
  } = api.recipe.scrapeRecipe.useMutation({
    onSuccess: ({ recipeName: recipe }) => {
      getSummary({ name: recipe ?? "" });
    },
  });
  const { data: summariesLeft, isLoading: isSummariesLeftLoading } =
    api.recipe.getSummariesLeftForUser.useQuery();
  const isError = isSummaryError || isScrapeError;

  return (
    <div className="relative flex flex-col gap-4">
      <h3 className="text-center text-2xl text-white">
        Paste your url from{" "}
        <a href="https://aniagotuje.pl" target="blank">
          <span className="text-[hsl(280,100%,70%)]">aniagotuje.pl</span>
        </a>{" "}
        below:
      </h3>
      <Input
        data={data ?? null}
        isGettingSummary={isGettingSummary}
        isLoading={isSummariesLeftLoading}
        isScraping={isScraping}
        isError={isError}
        scrapeRecipe={scrapeRecipe}
        summariesLeft={summariesLeft ?? 0}
      />
    </div>
  );
}
