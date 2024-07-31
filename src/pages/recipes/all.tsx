import Layout from "~/components/Layout";
import Link from "next/link";
import { api } from "~/utils/api";
import Loading from "~/components/Loading";

export default function All() {
  const { data, isLoading } = api.recipe.getAllRecipeNames.useQuery();
  const allRecipes = data ?? [];

  return (
    <Layout>
      {!isLoading ? (
        allRecipes.length === 0 ? (
          <p className="text-white">No recipes found</p>
        ) : (
          <ul className="text-xl text-white">
            {allRecipes.map((name) => (
              <li key={name} className="underline">
                <Link href={name}>{name.split("-").join(" ")}</Link>
              </li>
            ))}
          </ul>
        )
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
