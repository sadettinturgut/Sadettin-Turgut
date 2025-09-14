
import React from 'react';

export const ReuseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5c0 2.22-0.78 4.29-2.09 5.91L21 19.5" />
    <path d="M2.5 12a9.5 9.5 0 0 1 12.89-8.41" />
    <path d="M2.5 12H6v-3.5" />
    <path d="M21.5 12H18v3.5" />
  </svg>
);
