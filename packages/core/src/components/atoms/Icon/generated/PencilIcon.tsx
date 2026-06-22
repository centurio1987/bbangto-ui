import * as React from 'react';

export const PencilIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="-4 -4 32 32" 
    fill="none" 
    width="1em" 
    height="1em" 
    {...props}
  >
    <defs>
      <filter id="handdrawn-pencil" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <g filter="url(#handdrawn-pencil)">
      {/* Outline (Background) */}
      <g stroke="#1C1B18" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
  <path d="m15 5 4 4"/>
      </g>
      {/* Fill (Foreground) */}
      <g stroke="#4E6CA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
  <path d="m15 5 4 4"/>
      </g>
    </g>
  </svg>
);
