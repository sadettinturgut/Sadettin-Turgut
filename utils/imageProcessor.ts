
/**
 * Converts a data URL to a File object.
 * @param dataUrl The data URL string.
 * @param filename The desired filename for the new File.
 * @returns A promise that resolves to a File object.
 */
async function dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
}

/**
 * Enhances an image file by applying filters using a canvas.
 * @param file The image file to enhance.
 * @returns A promise that resolves with the new, enhanced File object.
 */
export const enhanceImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return reject(new Error('Could not get canvas context.'));
        }

        // Apply filters for enhancement: slightly increase contrast, saturation, and brightness
        // This makes colors more vibrant and can give a perception of sharpness.
        ctx.filter = 'contrast(1.1) saturate(1.1) brightness(1.05)';
        
        // Draw the image onto the canvas with the filters applied
        ctx.drawImage(img, 0, 0);

        const enhancedDataUrl = canvas.toDataURL(file.type);
        
        try {
            // Create a new file name for the enhanced image to avoid confusion
            const newFileName = `enhanced_${file.name}`;
            const enhancedFile = await dataUrlToFile(enhancedDataUrl, newFileName);
            resolve(enhancedFile);
        } catch (error) {
            reject(error);
        }

      };
      if (e.target?.result) {
        img.src = e.target.result as string;
      } else {
        reject(new Error("Could not read file for enhancement."));
      }
    };
  });
};
