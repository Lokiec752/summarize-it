import OpenAI from "openai";

function getContent(text: string) {
  return `Na podstawie tekstu, podaj zwięzły przepis w punktach. W pierwszej sekcji podaj wszystkie potrzebne składniki występujące w tekście. Tekst: ${text}`;
}

export async function getSummary(text: string) {
  if (!text) return "No content provided";
  const openai = new OpenAI();
  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: getContent(text) }],
    model: "gpt-4o-mini",
  });

  const recipe = response.choices[0]?.message?.content ?? "";

  return recipe;
}
