import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function HeaderBar() {
  const { data: sessionData } = useSession();
  return (
    <header className="fixed left-0 top-0 flex w-full items-center justify-between bg-purple-600 px-4 py-2 backdrop-blur-md">
      <Link className="text-2xl font-semibold text-white" href={"/"}>
        Summarize
      </Link>
      <div>
        <Link className="mr-2 text-white" href={"/recipes/all"}>
          All recipes
        </Link>
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </header>
  );
}
