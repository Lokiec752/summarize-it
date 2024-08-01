import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import Loading from "../Loading";
import LoggedInContent from "../LoggedInContent";

export default function Main() {
  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";

  return (
    <div className="main flex flex-col gap-12 px-2 py-2 sm:px-4">
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
      {!sessionLoading && session && <LoggedInContent />}
    </div>
  );
}
