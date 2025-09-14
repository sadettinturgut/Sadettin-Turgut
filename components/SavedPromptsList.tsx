
import React from 'react';
import { ReuseIcon } from './icons/ReuseIcon';
import { TrashIcon } from './icons/TrashIcon';

interface SavedPromptsListProps {
  prompts: string[];
  onUse: (prompt: string) => void;
  onDelete: (index: number) => void;
}

export const SavedPromptsList: React.FC<SavedPromptsListProps> = ({ prompts, onUse, onDelete }) => {
  if (prompts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-300">Kaydedilen Promptlar</h2>
      <div className="space-y-4">
        {prompts.map((prompt, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-gray-300 font-mono text-sm flex-1">{prompt}</p>
            <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
              <button
                onClick={() => onUse(prompt)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-3 rounded-md transition-colors"
                title="Bu prompt'u kullan"
              >
                <ReuseIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Kullan</span>
              </button>
              <button
                onClick={() => onDelete(index)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-md transition-colors"
                title="Bu prompt'u sil"
              >
                <TrashIcon className="w-4 h-4" />
                 <span className="hidden sm:inline">Sil</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
