import { ContentListUnion, GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAEji-0LenCtjkLLw-pIz30jIbfJiRdTpY",
});

const promptToGemini = async (contents: ContentListUnion) => {
  try {
    console.log(
      "🚀 ~ promptToGemini ~ contents:",
      JSON.stringify(contents).length,
    );
    const response = await ai.models.generateContent({
      // model: "gemini-2.5-pro-preview-06-05",
      model: "gemini-2.0-flash",
      contents,
    });
    return response.text;
  } catch (e) {
    return String(e);
  }
};

export default promptToGemini;
