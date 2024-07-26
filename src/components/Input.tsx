import { type FormEvent } from "react";
import Markdown from "react-markdown";
import { api } from "~/utils/api";
import Loading from "./Loading/Loading";

export default function Input() {
  const {
    mutate: postLink,
    data,
    isPending,
  } = api.recipe.postLink.useMutation();
  // for testing purposes
  const defaultLink = "https://aniagotuje.pl/przepis/zupa-meksykanska";
  return (
    <form
      className="flex flex-col items-center gap-6"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        const input = new FormData(e.target as HTMLFormElement);
        const link = input.get("link");
        if (typeof link !== "string") return;
        postLink({ link });
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
      {data && (
        <div className="rounded-md bg-purple-300 p-2 text-white">
          <Markdown className="prose">{data.recipe}</Markdown>
        </div>
      )}
      
      {isPending && <Loading />}
    </form>
  );
}
