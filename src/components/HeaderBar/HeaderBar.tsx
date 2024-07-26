import { signIn, signOut, useSession } from "next-auth/react";

export default function HeaderBar() {
  const { data: sessionData } = useSession();
  return (
    <header className="fixed left-0 top-0 flex w-full items-center justify-between bg-purple-600 px-4 py-2 backdrop-blur-md">
      <h1 className="text-2xl font-semibold text-white">Summarize</h1>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </header>
  );
}
