
/**
 * Generates a descriptive prompt for a given image by sending a request to our own backend service.
 * @param base64Image The base64 encoded string of the image.
 * @param mimeType The MIME type of the image (e.g., 'image/jpeg').
 * @returns A promise that resolves to the generated text prompt.
 */
export async function generatePromptFromImage(base64Image: string, mimeType: string): Promise<string> {
  try {
    // API çağrısını kendi backend servisimize yapıyoruz.
    // Bu servis API anahtarını güvenli bir şekilde yönetecektir.
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ base64Image, mimeType }),
    });

    if (!response.ok) {
      // Sunucudan gelen hatayı yakala
      const errorData = await response.json();
      throw new Error(errorData.error || `Sunucu hatası: ${response.statusText}`);
    }

    const data = await response.json();
    const promptText = data.prompt;

    if (!promptText) {
      throw new Error("Backend'den geçerli bir metin yanıtı alınamadı.");
    }

    return promptText.trim();
  } catch (error) {
    console.error("Backend servisiyle iletişim hatası:", error);
    if (error instanceof Error) {
        // Kullanıcıya daha anlaşılır bir hata mesajı göster
        throw new Error(`Prompt oluşturulamadı: ${error.message}`);
    }
    throw new Error("Yapay zeka ile iletişim kurarken bilinmeyen bir sorun oluştu.");
  }
}
