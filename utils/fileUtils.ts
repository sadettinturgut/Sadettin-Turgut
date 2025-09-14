
interface Base64ConversionResult {
  base64: string;
  mimeType: string;
}

/**
 * Converts a File object to a base64 string.
 * @param file The file to convert.
 * @returns A promise that resolves with an object containing the base64 string (without the data URI prefix) and the file's MIME type.
 */
export const fileToBase64 = (file: File): Promise<Base64ConversionResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // The result includes the data URI prefix (e.g., "data:image/png;base64,"), 
      // which needs to be removed for the Gemini API.
      const base64 = result.split(',')[1];
      if (base64) {
        resolve({ base64, mimeType: file.type });
      } else {
        reject(new Error("Dosya base64 formatına dönüştürülemedi."));
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
