import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LUCIDE_DIR = path.join(__dirname, '../node_modules/lucide-static/icons');
const OUT_DIR = path.join(__dirname, '../src/components/atoms/Icon/generated');

const ICONS_TO_GENERATE = [
  // Phase 1: Navigation & Essential Actions
  'arrow-left', 'arrow-up', 'arrow-down', 'chevron-left', 'chevron-up', 'chevrons-right', 'chevrons-left', 'chevrons-up', 'chevrons-down',
  'more-horizontal', 'more-vertical', 'external-link', 'link',
  'edit', 'pencil', 'trash', 'trash-2', 'copy', 'save', 'download', 'upload', 'share', 'share-2', 'refresh-cw', 'filter',
  'arrow-right', 'chevron-right', 'chevron-down', 'menu', 'x', 'home', 'search', 'settings',

  // Phase 2: Feedback, Status & Communication
  'alert-triangle', 'help-circle', 'check-circle', 'x-circle', 'check-square', 'alert-circle', 'info', 'check',
  'users', 'user-plus', 'user-minus', 'user-check', 'log-in', 'log-out', 'user',
  'mail', 'message-circle', 'message-square', 'phone', 'bell', 'bell-off', 'send',
  'lock', 'unlock', 'eye', 'eye-off', 'key',

  // Phase 3: Content, Media & Files
  'play', 'pause', 'stop-circle', 'image', 'video', 'camera', 'mic', 'mic-off', 'volume-2', 'volume-x',
  'file', 'file-text', 'folder', 'folder-open', 'folder-plus', 'paperclip', 'archive',
  'shopping-cart', 'shopping-bag', 'credit-card', 'dollar-sign', 'heart', 'star', 'bookmark', 'tag', 'bar-chart-2', 'pie-chart', 'trending-up',

  // Phase 4: Hardware & Miscellaneous
  'smartphone', 'monitor', 'laptop', 'tablet', 'printer',
  'calendar', 'clock', 'map-pin', 'map', 'compass', 'globe',
  'sliders', 'award', 'gift', 'flag', 'zap', 'coffee', 'sun', 'moon'
];

function toPascalCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

async function generate() {
  await fs.ensureDir(OUT_DIR);
  await fs.emptyDir(OUT_DIR);

  let generatedCount = 0;
  const exports = [];

  for (const name of ICONS_TO_GENERATE) {
    const srcPath = path.join(LUCIDE_DIR, `${name}.svg`);
    if (!await fs.pathExists(srcPath)) {
      console.warn(`Icon ${name} not found in lucide-static`);
      continue;
    }

    const svgContent = await fs.readFile(srcPath, 'utf8');
    const $ = cheerio.load(svgContent, { xmlMode: true });
    const $svg = $('svg');
    
    $svg.children().each((i, el) => {
      $(el).removeAttr('class');
    });

    // Replace properties like stroke-width to strokeWidth for React
    let innerHtml = $svg.html()
      .replace(/stroke-linecap/g, 'strokeLinecap')
      .replace(/stroke-linejoin/g, 'strokeLinejoin')
      .replace(/stroke-width/g, 'strokeWidth');
    
    const componentName = toPascalCase(name) + 'Icon';

    const componentContent = `import * as React from 'react';

export const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="-4 -4 32 32" 
    fill="none" 
    width="1em" 
    height="1em" 
    {...props}
  >
    <defs>
      <filter id="handdrawn-${name}" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <g filter="url(#handdrawn-${name})">
      {/* Outline (Background) */}
      <g stroke="#1C1B18" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        ${innerHtml.trim()}
      </g>
      {/* Fill (Foreground) */}
      <g stroke="#4E6CA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        ${innerHtml.trim()}
      </g>
    </g>
  </svg>
);
`;

    await fs.writeFile(path.join(OUT_DIR, `${componentName}.tsx`), componentContent);
    exports.push(`export * from './${componentName}';`);
    generatedCount++;
  }

  // Create index.ts
  await fs.writeFile(path.join(OUT_DIR, 'index.ts'), exports.join('\n') + '\n');
  console.log(`\nSuccessfully generated ${generatedCount} React Icon components.`);
}

generate().catch(console.error);
