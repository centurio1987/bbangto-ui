import * as React from 'react';

export const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="-4 -4 32 32" 
    fill="none" 
    width="1em" 
    height="1em" 
    {...props}
  >
    <defs>
      <filter id="handdrawn-users" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <g filter="url(#handdrawn-users)">
      {/* Outline (Background) */}
      <g stroke="#1C1B18" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
  <path d="M16 3.128a4 4 0 0 1 0 7.744"/>
  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
  <circle cx="9" cy="7" r="4"/>
      </g>
      {/* Fill (Foreground) */}
      <g stroke="#4E6CA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
  <path d="M16 3.128a4 4 0 0 1 0 7.744"/>
  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
  <circle cx="9" cy="7" r="4"/>
      </g>
    </g>
  </svg>
);
