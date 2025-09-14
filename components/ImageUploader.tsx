
import React, { useCallback, useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  previewUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, previewUrl }) => {
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

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageSelect(file);
    }
  };


  return (
    <div className="w-full">
      <label
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="cursor-pointer flex justify-center items-center w-full h-64 md:h-full min-h-[256px] border-2 border-dashed border-gray-600 hover:border-indigo-500 rounded-xl transition-colors duration-300 bg-gray-800/50 hover:bg-gray-800/80 p-4"
      >
        <div className="text-center">
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
            <div className="flex flex-col items-center text-gray-400">
              <UploadIcon className="w-12 h-12 mb-3" />
              <p className="font-semibold">Resim seçmek için tıklayın</p>
              <p className="text-sm">veya sürükleyip bırakın</p>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};
