
import React, { useState, useEffect } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { Loader } from './Loader';

interface PromptDisplayProps {
  prompt: string;
  isLoading: boolean;
}

export const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt, isLoading }) => {
  const [copied, setCopied] = useState(false);
  const [displayedPrompt, setDisplayedPrompt] = useState('');

  useEffect(() => {
    if (!isLoading && prompt) {
      setDisplayedPrompt('');
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedPrompt(prompt.substring(0, i + 1));
        i++;
        if (i >= prompt.length) {
          clearInterval(interval);
        }
      }, 10); // Adjust speed of typing effect
      return () => clearInterval(interval);
    }
  }, [prompt, isLoading]);

  const handleCopy = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative min-h-[200px] h-full flex flex-col justify-between bg-gray-900 p-4 rounded-lg">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
            <Loader />
        </div>
      ) : displayedPrompt ? (
        <>
          <p className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">{displayedPrompt}</p>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors"
            title="Prompt'u kopyala"
          >
            <CopyIcon className={`w-5 h-5 ${copied ? 'text-green-400' : 'text-gray-400'}`} />
          </button>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Prompt burada görünecek...</p>
        </div>
      )}
    </div>
  );
};
