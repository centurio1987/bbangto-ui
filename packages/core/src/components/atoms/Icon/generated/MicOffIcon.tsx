import * as React from 'react';

export const MicOffIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="-4 -4 32 32" 
    fill="none" 
    width="1em" 
    height="1em" 
    {...props}
  >
    <defs>
      <filter id="handdrawn-mic-off" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <g filter="url(#handdrawn-mic-off)">
      {/* Outline (Background) */}
      <g stroke="#1C1B18" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19v3"/>
  <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/>
  <path d="M16.95 16.95A7 7 0 0 1 5 12v-2"/>
  <path d="M18.89 13.23A7 7 0 0 0 19 12v-2"/>
  <path d="m2 2 20 20"/>
  <path d="M9 9v3a3 3 0 0 0 5.12 2.12"/>
      </g>
      {/* Fill (Foreground) */}
      <g stroke="#4E6CA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19v3"/>
  <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/>
  <path d="M16.95 16.95A7 7 0 0 1 5 12v-2"/>
  <path d="M18.89 13.23A7 7 0 0 0 19 12v-2"/>
  <path d="m2 2 20 20"/>
  <path d="M9 9v3a3 3 0 0 0 5.12 2.12"/>
      </g>
    </g>
  </svg>
);
