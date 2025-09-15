
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptDisplay } from './components/PromptDisplay';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { generatePromptFromImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { SavedPromptsList } from './components/SavedPromptsList';
import { enhanceImage } from './utils/imageProcessor';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [isEnhanced, setIsEnhanced] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);

  // Load saved prompts from localStorage on initial render
  useEffect(() => {
    try {
      const storedPrompts = localStorage.getItem('savedPrompts');
      if (storedPrompts) {
        setSavedPrompts(JSON.parse(storedPrompts));
      }
    } catch (err) {
      console.error("Failed to load prompts from localStorage", err);
      setSavedPrompts([]);
    }
  }, []);

  // Save prompts to localStorage whenever the state changes
  useEffect(() => {
    try {
      localStorage.setItem('savedPrompts', JSON.stringify(savedPrompts));
    } catch (err) {
      console.error("Failed to save prompts to localStorage", err);
    }
  }, [savedPrompts]);


  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setOriginalImageFile(file);
    setIsEnhanced(false);
    setGeneratedPrompt('');
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleEnhanceImage = useCallback(async () => {
    if (!imageFile) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const enhancedFile = await enhanceImage(imageFile);
      setImageFile(enhancedFile);
      setIsEnhanced(true);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(enhancedFile);

    } catch (err) {
      setError('Görüntü kalitesi artırılırken bir hata oluştu.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);
  
  const handleRevertImage = useCallback(() => {
    if (originalImageFile) {
        setImageFile(originalImageFile);
        setIsEnhanced(false);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(originalImageFile);
    }
  }, [originalImageFile]);

  const handleGeneratePrompt = useCallback(async () => {
    if (!imageFile) {
      setError('Lütfen önce bir resim seçin.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      const { base64, mimeType } = await fileToBase64(imageFile);
      const prompt = await generatePromptFromImage(base64, mimeType);
      setGeneratedPrompt(prompt);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu.';
      setError(`Prompt oluşturulurken bir hata oluştu: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);

  const handleSavePrompt = useCallback(() => {
    if (generatedPrompt && !savedPrompts.includes(generatedPrompt)) {
      setSavedPrompts(prevPrompts => [generatedPrompt, ...prevPrompts]);
    }
  }, [generatedPrompt, savedPrompts]);

  const handleDeletePrompt = useCallback((indexToDelete: number) => {
    setSavedPrompts(prevPrompts => prevPrompts.filter((_, index) => index !== indexToDelete));
  }, []);
  
  const handleUsePrompt = useCallback((promptToUse: string) => {
    setGeneratedPrompt(promptToUse);
    setImageFile(null);
    setOriginalImageFile(null);
    setIsEnhanced(false);
    setPreviewUrl(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />

        <main className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-6">
            <ImageUploader 
              onImageSelect={handleImageSelect} 
              previewUrl={previewUrl}
              onEnhance={handleEnhanceImage}
              onRevert={handleRevertImage}
              isEnhanced={isEnhanced}
              isLoading={isLoading}
            />
            
            <button
              onClick={handleGeneratePrompt}
              disabled={!imageFile || isLoading}
              className="flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 shadow-lg"
            >
              {isLoading && !generatedPrompt ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  İşleniyor...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-6 h-6 mr-2" />
                  Prompt Oluştur
                </>
              )}
            </button>
            {error && <p className="text-red-400 text-center text-sm mt-2">{error}</p>}
          </div>

          <div className="bg-gray-800 rounded-xl shadow-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Oluşturulan Prompt</h2>
            <PromptDisplay 
              prompt={generatedPrompt} 
              isLoading={isLoading} 
              onSave={handleSavePrompt}
              isSaved={savedPrompts.includes(generatedPrompt)}
            />
          </div>
        </main>
        
        <SavedPromptsList 
          prompts={savedPrompts}
          onUse={handleUsePrompt}
          onDelete={handleDeletePrompt}
        />

        <footer className="text-center text-gray-500 mt-12 text-sm">
            <p>Gemini AI ile güçlendirilmiştir.</p>
            <p className="mt-1">Programı Tasarlayan: Sadettin Turgut</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
