import Link from "next/link";
import { api } from "~/utils/api";

export default function RecentlyAdded({
  position,
}: {
  position: "relative" | "absolute";
}) {
  const { data: recentRecipes } = api.recipe.getRecentlyAdded.useQuery();
  if (recentRecipes?.length === 0) return null;
  return (
    <div className={`${position} bottom-4 left-0 flex w-full flex-col gap-4`}>
      <h3 className="text-center text-2xl text-white">
        Recently added recipes:{" "}
      </h3>
      <ul className="flex w-full flex-row items-center justify-center gap-5 text-white">
        {recentRecipes?.map((recipe) => (
          <li key={recipe} className="text-center">
            <Link href={`/recipes/${recipe}`}>
              {recipe.replaceAll("-", " ")}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
