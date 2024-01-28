'use server';
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
console.log(process.env.GEMINI_API_KEY, process.env)
const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY);

const MODEL_NAME = 'gemini-pro'

const model = genAI.getGenerativeModel({ model: MODEL_NAME});

export default async function callGPT(text: string) {

    const gptResult = await model.generateContent(text);
    const response = await gptResult.response;
    const result = response.text();
    return result;
}