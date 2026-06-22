import * as React from 'react';

export const SlidersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="-4 -4 32 32" 
    fill="none" 
    width="1em" 
    height="1em" 
    {...props}
  >
    <defs>
      <filter id="handdrawn-sliders" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <g filter="url(#handdrawn-sliders)">
      {/* Outline (Background) */}
      <g stroke="#1C1B18" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 8h4"/>
  <path d="M12 21v-9"/>
  <path d="M12 8V3"/>
  <path d="M17 16h4"/>
  <path d="M19 12V3"/>
  <path d="M19 21v-5"/>
  <path d="M3 14h4"/>
  <path d="M5 10V3"/>
  <path d="M5 21v-7"/>
      </g>
      {/* Fill (Foreground) */}
      <g stroke="#4E6CA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 8h4"/>
  <path d="M12 21v-9"/>
  <path d="M12 8V3"/>
  <path d="M17 16h4"/>
  <path d="M19 12V3"/>
  <path d="M19 21v-5"/>
  <path d="M3 14h4"/>
  <path d="M5 10V3"/>
  <path d="M5 21v-7"/>
      </g>
    </g>
  </svg>
);
