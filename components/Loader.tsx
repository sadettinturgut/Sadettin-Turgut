
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-600 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm">Yapay zeka düşünüyor...</p>
    </div>
  );
};
