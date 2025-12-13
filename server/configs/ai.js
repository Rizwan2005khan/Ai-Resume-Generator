import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.OPENAI_API_KEY, // your Gemini API key
});

export default ai;
