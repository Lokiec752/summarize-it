import { api } from "~/utils/api";

export default function RecentlyAdded() {
  const { data } = api.recipe.getRecentlyAdded.useQuery();
  return (
    <div>
      <h3 className="text-2xl text-white">Recently added recipes: </h3>
      <ul className="flex flex-col items-center text-white">
        {data?.map((recipe) => <li key={recipe}>{recipe}</li>)}
      </ul>
    </div>
  );
}
