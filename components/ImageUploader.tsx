
import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { WandIcon } from './icons/WandIcon';
import { UndoIcon } from './icons/UndoIcon';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  previewUrl: string | null;
  onEnhance: () => void;
  onRevert: () => void;
  isEnhanced: boolean;
  isLoading: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, previewUrl, onEnhance, onRevert, isEnhanced, isLoading }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageSelect(file);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative flex justify-center items-center w-full h-64 md:h-[300px] border-2 border-dashed border-gray-600 rounded-xl transition-colors duration-300 bg-gray-800/50 p-4 group"
      >
        <div 
          onClick={handleClick}
          className="cursor-pointer w-full h-full flex justify-center items-center"
        >
          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
          />
          {previewUrl ? (
            <img src={previewUrl} alt="Yüklenen resim önizlemesi" className="max-h-full max-w-full object-contain rounded-lg" />
          ) : (
            <div className="flex flex-col items-center text-gray-400 group-hover:text-indigo-400 transition-colors">
              <UploadIcon className="w-12 h-12 mb-3" />
              <p className="font-semibold">Resim seçmek için tıklayın</p>
              <p className="text-sm">veya sürükleyip bırakın</p>
            </div>
          )}
        </div>
        {isEnhanced && (
          <span className="absolute top-2 right-2 bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            İyileştirildi
          </span>
        )}
      </div>

      {previewUrl && (
        <div className="flex items-center justify-center gap-4">
          {!isEnhanced ? (
            <button
              onClick={onEnhance}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <WandIcon className="w-5 h-5" />
              Kaliteyi Artır
            </button>
          ) : (
            <button
              onClick={onRevert}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <UndoIcon className="w-5 h-5" />
              Orijinale Dön
            </button>
          )}
        </div>
      )}
    </div>
  );
};
