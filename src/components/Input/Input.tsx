import { type FormEvent } from "react";
import Markdown from "react-markdown";
import Loading from "../Loading";
import Container from "~/components/Container";
import { api } from "~/utils/api";

export default function Input() {
  const utils = api.useUtils();
  const {
    mutate: getSummary,
    isPending: isGettingSummary,
    data,
  } = api.recipe.getSummary.useMutation({
    onSuccess: async () => {
      await utils.recipe.getRecentlyAdded.invalidate();
    },
  });
  const { mutate: scrapeRecipe, isPending: isScraping } =
    api.recipe.scrapeRecipe.useMutation({
      onSuccess: ({ recipeName: recipe }) => {
        getSummary({ name: recipe ?? "" });
      },
    });
  // for testing purposes
  const defaultLink = "https://aniagotuje.pl/przepis/zupa-meksykanska";
  const isLoading = isScraping || isGettingSummary;
  return (
    <form
      className="flex flex-col items-center gap-6"
      onSubmit={async (e: FormEvent) => {
        e.preventDefault();
        const input = new FormData(e.target as HTMLFormElement);
        const link = input.get("link");
        if (typeof link !== "string") return;
        scrapeRecipe({ link });
      }}
    >
      <div className="flex gap-2">
        <input
          className="w-full max-w-lg rounded-md bg-white p-2 text-lg text-black"
          type="text"
          name="link"
          placeholder="Wklej link"
          defaultValue={defaultLink}
        />
        <button type="submit" className="rounded-md bg-blue-500 p-2 text-white">
          Submit
        </button>
      </div>
      {isScraping && <Loading text="Scrapping the recipe" />}
      {!isScraping && isGettingSummary && (
        <Loading text="Computing the summary" />
      )}
      {!isLoading && data && (
        <Container>
          <Markdown className="prose">{data.summary}</Markdown>
        </Container>
      )}
    </form>
  );
}
