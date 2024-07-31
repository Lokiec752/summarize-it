import { type FormEvent } from "react";
import Markdown from "react-markdown";
import Loading from "../Loading";
import Container from "~/components/Container";

type InputProps = {
  summariesLeft: number;
  data: { summary: string } | null;
  isScraping: boolean;
  isGettingSummary: boolean;
  isLoading: boolean;
  isError: boolean;
  scrapeRecipe: (input: { link: string }) => void;
};

export default function Input({
  data,
  isGettingSummary,
  isScraping,
  isLoading,
  isError,
  summariesLeft,
  scrapeRecipe,
}: InputProps) {
  const isComputingSummary = isScraping || isGettingSummary;

  if (isLoading) return <Loading />;

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
      {summariesLeft !== 0 && (
        <div className="flex flex-col">
          <div className="flex gap-2">
            <input
              className="w-full max-w-lg rounded-md bg-white p-2 text-lg text-black"
              type="text"
              name="link"
              placeholder="Paste link here"
            />
            <button
              type="submit"
              className="rounded-md bg-blue-500 p-2 text-white"
            >
              Submit
            </button>
          </div>
          <div className="flex justify-center text-white">
            Summaries left today: {summariesLeft}
          </div>
        </div>
      )}
      {summariesLeft === 0 && (
        <div className="text-center text-purple-600">
          You have reached the limit of summaries for today. Please try again
          tomorrow 👋
        </div>
      )}
      {isScraping && <Loading text="Scrapping the recipe" />}
      {!isScraping && isGettingSummary && (
        <Loading text="Computing the summary" />
      )}
      {!isComputingSummary && data && (
        <Container>
          <Markdown className="prose">{data.summary}</Markdown>
        </Container>
      )}
      {isError && <p className="text-red-600">Error, please try again</p>}
    </form>
  );
}
