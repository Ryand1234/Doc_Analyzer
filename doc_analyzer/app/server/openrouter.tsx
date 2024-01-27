'use server';

export default async function callGPT(text: string) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer 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`,
      "X-Title": 'Doc Analyzer', // Optional. Shows in rankings on openrouter.ai.
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "mistralai/mistral-7b-instruct", // Optional (user controls the default),
      "messages": [
        { "role": "user", "content": `Question: ${text}.` },
      ]
    })
  });
  const result = await response.json();
  return result.choices[0].message.content;
}