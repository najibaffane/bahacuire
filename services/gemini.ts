
import { GoogleGenAI } from "@google/genai";
import { BRAND_NAME } from "../constants";

// Initialisation sécurisée
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getLeatherAdvice = async (userInput: string) => {
  const ai = getAIClient();
  if (!ai) return "L'atelier est momentanément silencieux (Configuration requise).";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userInput,
      config: {
        systemInstruction: `Tu es un expert artisan maroquinier passionné travaillant pour "${BRAND_NAME}". 
        Ton but est d'aider les clients à comprendre la valeur du travail fait main (point de sellier, tannage végétal) et de leur donner des conseils d'entretien précis.
        Utilise un ton artisanal, luxueux, précis et chaleureux. 
        Mets en avant le fait que chez ${BRAND_NAME}, nous ne faisons aucun compromis sur la qualité depuis 2020.
        Réponds en français avec élégance. Limite tes réponses à environ 150 mots.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "L'atelier est momentanément silencieux. Puis-je vous aider d'une autre manière ?";
  }
};
