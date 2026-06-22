import * as React from 'react';

export const XCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="-4 -4 32 32" 
    fill="none" 
    width="1em" 
    height="1em" 
    {...props}
  >
    <defs>
      <filter id="handdrawn-x-circle" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <g filter="url(#handdrawn-x-circle)">
      {/* Outline (Background) */}
      <g stroke="#1C1B18" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
  <path d="m15 9-6 6"/>
  <path d="m9 9 6 6"/>
      </g>
      {/* Fill (Foreground) */}
      <g stroke="#4E6CA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
  <path d="m15 9-6 6"/>
  <path d="m9 9 6 6"/>
      </g>
    </g>
  </svg>
);
