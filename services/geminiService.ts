import { GoogleGenAI } from "@google/genai";

// API Anahtarı, masaüstü uygulaması olarak kişisel kullanım için doğrudan koda eklenmiştir.
// ÖNEMLİ: Bu kodu başkalarıyla paylaşırsanız API anahtarınız risk altında olabilir.
const apiKey = "AIzaSyBfOrF0MnfGuK3hfzlauGoTESWNk25dHas";

if (!apiKey) {
  throw new Error("API anahtarı kod içinde ayarlanmamış.");
}

const ai = new GoogleGenAI({ apiKey: apiKey });


/**
 * Generates a descriptive prompt for a given image using the Gemini API.
 * @param base64Image The base64 encoded string of the image.
 * @param mimeType The MIME type of the image (e.g., 'image/jpeg').
 * @returns A promise that resolves to the generated text prompt.
 */
export async function generatePromptFromImage(base64Image: string, mimeType: string): Promise<string> {
  try {
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: "Bu resmi bir sanatçı gözüyle, detaylı ve şiirsel bir dille betimle. Manzarayı, objeleri, renkleri, ışığı ve atmosferi anlat. Oluşturulacak prompt, başka bir yapay zeka resim oluşturma modelinde (örn: Midjourney, Stable Diffusion) kullanılabilecek nitelikte, zengin ve yaratıcı olmalı. Cevabın yalnızca Türkçe olmalıdır.",
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });
    
    // Using the direct .text accessor as per the new guidelines
    const promptText = response.text;
    
    if (!promptText) {
        throw new Error("API'den geçerli bir metin yanıtı alınamadı.");
    }
    
    return promptText.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Yapay zeka ile iletişim kurarken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.");
  }
}