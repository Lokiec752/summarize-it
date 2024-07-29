import { type GetStaticPaths, type GetStaticProps } from "next";
import { eq, type InferSelectModel } from "drizzle-orm";
import { db } from "~/server/db";
import { recipes } from "~/server/db/schema";
import { useRouter } from "next/router";
import Markdown from "react-markdown";

type Recipe = Omit<
  InferSelectModel<typeof recipes>,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string | null;
};

export default function RecipePage({ recipe }: { recipe: Recipe }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-5xl font-extrabold tracking-tight text-white">
        {recipe.name}
      </h1>
      <div className="rounded-md bg-purple-300 p-2 text-white">
        <Markdown className="prose">{recipe.summary}</Markdown>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // call db directly to get all recipe ids
  const paths = await db
    .select({
      name: recipes.name,
    })
    .from(recipes);
  console.log(paths);
  return {
    paths: paths.map(({ name }) => ({ params: { name } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  { recipe: Recipe },
  { name: string }
> = async (ctx) => {
  const { name } = ctx.params!;
  const queryResult = await db
    .select()
    .from(recipes)
    .where(eq(recipes.name, name));
  const recipe = queryResult[0];

  console.log(recipe);

  if (!recipe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipe: {
        ...recipe,
        createdAt: recipe.createdAt.toISOString(),
        updatedAt: recipe.updatedAt?.toISOString() ?? null,
      },
    },
  };
};
