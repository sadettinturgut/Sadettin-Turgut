
import React from 'react';

export const WandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M15 4V2" />
    <path d="M15 8V6" />
    <path d="M15 12V10" />
    <path d="M15 16V14" />
    <path d="M15 20V18" />
    <path d="M18 6l2-2" />
    <path d="M22 10l-2-2" />
    <path d="M18 14l2 2" />
    <path d="M22 18l-2 2" />
    <path d="M4 15l-2 2" />
    <path d="M8 15l2 2" />
    <path d="M6 18l-2 2" />
    <path d="M10 18l-2 2" />
    <path d="M12 4h-2a4 4 0 0 0-4 4v0" />
    <path d="M8 12v0a4 4 0 0 0 4 4h2" />
  </svg>
);
