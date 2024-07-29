import { useSession, signIn } from "next-auth/react";
import Input from "../Input";
import RecentlyAdded from "../RecentlyAdded";
import Link from "next/link";

export default function Main() {
  const { data: session } = useSession();

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-2 py-16 sm:px-4">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Summarize <span className="text-[hsl(280,100%,70%)]">it!</span>
      </h1>
      {!session && (
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
      {session && (
        <>
          <h3 className="text-center text-2xl text-white">
            Paste your url from{" "}
            <a href="https://aniagotuje.pl" target="blank">
              <span className="text-[hsl(280,100%,70%)]">aniagotuje.pl</span>
            </a>{" "}
            below:
          </h3>
          <Input />
          <RecentlyAdded />
        </>
      )}
    </div>
  );
}
