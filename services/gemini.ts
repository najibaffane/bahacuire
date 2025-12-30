
import { GoogleGenAI, Type } from "@google/genai";
import { BRAND_NAME } from "../constants";

// Fix: Strictly following the SDK guideline for initialization using named parameter and environment variable directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLeatherAdvice = async (userInput: string) => {
  try {
    // Fix: Using ai.models.generateContent directly
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userInput,
      config: {
        systemInstruction: `Tu es un expert artisan maroquinier passionné travaillant pour "${BRAND_NAME}". 
        Ton but est d'aider les clients à comprendre la valeur du travail fait main (point de sellier, tannage végétal) et de leur donner des conseils d'entretien précis.
        Utilise un ton artisanal, luxueux, précis et chaleureux. 
        Mets en avant le fait que chez ${BRAND_NAME}, nous ne faisons aucun compromis sur la qualité depuis 2020.
        Si on te demande quel produit acheter, réfère-toi aux créations de l'atelier (cartables, besaces, pochettes nomades).
        Réponds en français avec élégance. Limite tes réponses à environ 150 mots.`,
      },
    });
    // Fix: Accessing .text property directly (not calling as a method)
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "L'atelier est momentanément silencieux. Puis-je vous aider d'une autre manière ?";
  }
};
