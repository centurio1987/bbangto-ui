import * as React from 'react';

export const MicIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="-4 -4 32 32" 
    fill="none" 
    width="1em" 
    height="1em" 
    {...props}
  >
    <defs>
      <filter id="handdrawn-mic" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <g filter="url(#handdrawn-mic)">
      {/* Outline (Background) */}
      <g stroke="#1C1B18" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19v3"/>
  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
  <rect x="9" y="2" width="6" height="13" rx="3"/>
      </g>
      {/* Fill (Foreground) */}
      <g stroke="#4E6CA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19v3"/>
  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
  <rect x="9" y="2" width="6" height="13" rx="3"/>
      </g>
    </g>
  </svg>
);
