
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
        Görüntüden Prompt'a
      </h1>
      <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
        Bir resim yükleyin, yapay zeka sizin için o resimden ilham alan yaratıcı bir prompt oluştursun.
      </p>
    </header>
  );
};
