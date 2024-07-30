import { useSession, signIn } from "next-auth/react";
import Input from "../Input";
import RecentlyAdded from "../RecentlyAdded";
import Link from "next/link";
import { api } from "~/utils/api";
import Loading from "../Loading";

export default function Main() {
  const { data: session, status: sessionStatus } = useSession();
  const utils = api.useUtils();
  const {
    mutate: getSummary,
    isPending: isGettingSummary,
    data,
  } = api.recipe.getSummary.useMutation({
    onSuccess: async () => {
      await utils.recipe.getSummariesLeftForUser.invalidate();
      await utils.recipe.getRecentlyAdded.invalidate();
    },
  });
  const { mutate: scrapeRecipe, isPending: isScraping } =
    api.recipe.scrapeRecipe.useMutation({
      onSuccess: ({ recipeName: recipe }) => {
        getSummary({ name: recipe ?? "" });
      },
    });
  const { data: summariesLeft, isLoading: isSummariesLeftLoading } =
    api.recipe.getSummariesLeftForUser.useQuery();

  const sessionLoading = sessionStatus === "loading";

  return (
    <div
      className={`main flex flex-col gap-12 px-2 py-2 sm:px-4 ${data?.summary ? "pt-20" : ""}`}
    >
      <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Summarize <span className="text-[hsl(280,100%,70%)]">it!</span>
      </h1>
      {sessionLoading && <Loading />}
      {!sessionLoading && !session && (
        <div className="flex flex-col items-center gap-16">
          <h1 className="text-xl text-white sm:text-2xl">
            Please{" "}
            <button
              className="text-[hsl(280,100%,70%)]"
              onClick={() => void signIn()}
            >
              sign in
            </button>
          </h1>
          <h1 className="text-center text-xl text-white sm:text-2xl">
            ...or search already added{" "}
            <Link className="text-[hsl(280,100%,70%)]" href={"/recipes/all"}>
              summaries
            </Link>
          </h1>
        </div>
      )}
      {!sessionLoading && session && (
        <>
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
              scrapeRecipe={scrapeRecipe}
              summariesLeft={summariesLeft ?? 0}
            />
          </div>
          <RecentlyAdded position={data?.summary ? "relative" : "absolute"} />
        </>
      )}
    </div>
  );
}
