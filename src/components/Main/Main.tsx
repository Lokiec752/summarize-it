import { useSession, signIn } from "next-auth/react";
import Input from "../Input";

export default function Main() {
  const { data: session } = useSession();

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Summarize <span className="text-[hsl(280,100%,70%)]">it!</span>
      </h1>
      {!session && (
        <h1 className="text-2xl text-white">
          Please{" "}
          <button
            className="text-[hsl(280,100%,70%)]"
            onClick={() => void signIn()}
          >
            sign in
          </button>
        </h1>
      )}
      {session && (
        <>
          <h3 className="text-2xl text-white">
            Paste your url from{" "}
            <a href="https://aniagotuje.pl" target="blank">
              <span className="text-[hsl(280,100%,70%)]">aniagotuje.pl</span>
            </a>{" "}
            below:
          </h3>
          <Input />
        </>
      )}
    </div>
  );
}
