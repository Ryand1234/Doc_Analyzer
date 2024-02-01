// 'use server';

export default async function callGPT(context: string, text: string) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
      "X-Title": 'Doc Analyzer', // Optional. Shows in rankings on openrouter.ai.
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "mistralai/mistral-7b-instruct:free", // Optional (user controls the default),
      "messages": [
        { "role": "system", "content": `You are a document analyzer. Given a context answer the following questions: ${context}. Always paraphrase the response before answering and Give the response in "html format" in "utf-8" only.` },
        { "role": "user", "content": `Question: ${text}.` },
      ]
    })
  });
  const result = await response.json();
  return result.choices[0].message.content;
}