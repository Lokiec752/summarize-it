import { type GetStaticPaths, type GetStaticProps } from "next";
import { eq, type InferSelectModel } from "drizzle-orm";
import { db } from "~/server/db";
import { recipes } from "~/server/db/schema";
import { useRouter } from "next/router";
import Markdown from "react-markdown";
import Layout from "~/components/Layout";
import Container from "~/components/Container";
import Link from "next/link";

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
    <Layout>
      <h1 className="mt-20 pb-5 text-center text-5xl font-extrabold tracking-tight text-white 2xl:mt-28">
        {recipe.name.split("-").join(" ")}
      </h1>
      <p className="m-2 text-center text-white">
        Original link:{" "}
        <Link
          className="text text-purple-300"
          href={recipe.url ?? ""}
          target="_blank"
        >
          {recipe.url}
        </Link>
      </p>
      <Container>
        <Markdown className="prose">{recipe.summary}</Markdown>
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // call db directly to get all recipe ids
  const paths = await db
    .select({
      name: recipes.name,
    })
    .from(recipes);
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
    revalidate: 60,
  };
};
