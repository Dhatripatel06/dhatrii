import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, 'public');
const manifestPath = path.join(PUBLIC_DIR, 'asset-manifest.json');

if (!fs.existsSync(manifestPath)) {
  console.error('asset-manifest.json not found!');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

// Build reverse lookup map for font files specifically
const fontMap = new Map();
for (const [origUrl, localRel] of Object.entries(manifest)) {
  if (localRel.startsWith('fonts/')) {
    const filename = path.basename(localRel);
    fontMap.set(origUrl, filename);
    // also map URL without parameters if any
    try {
      const cleanUrl = origUrl.split('?')[0];
      fontMap.set(cleanUrl, filename);
    } catch(e){}
  }
}

console.log(`Loaded ${fontMap.size} font mapping rules.`);

// 1. Process typography.css: replace remote font URLs with local relative paths: ../fonts/filename.woff2
let typographyCss = fs.readFileSync(path.join(PUBLIC_DIR, 'css', 'typography.css'), 'utf-8');

fontMap.forEach((localFileName, origUrl) => {
  typographyCss = typographyCss.replaceAll(origUrl, `../fonts/${localFileName}`);
});

// Also replace generic woff2 URLs in typography.css with matching font files in public/fonts/ if any remain
const remoteWoff2Regex = /https:\/\/[^"')\s]+\.woff2/gi;
typographyCss = typographyCss.replace(remoteWoff2Regex, (match) => {
  const cleanMatch = match.split('?')[0];
  if (fontMap.has(match)) return `../fonts/${fontMap.get(match)}`;
  if (fontMap.has(cleanMatch)) return `../fonts/${fontMap.get(cleanMatch)}`;
  return match;
});

fs.writeFileSync(path.join(PUBLIC_DIR, 'css', 'typography.css'), typographyCss);
console.log('Updated public/css/typography.css with local font paths');

// 2. Process inline-styles.css: replace remote font URLs and remote images with local relative paths
let inlineCss = fs.readFileSync(path.join(PUBLIC_DIR, 'css', 'inline-styles.css'), 'utf-8');

for (const [origUrl, localRel] of Object.entries(manifest)) {
  if (localRel.startsWith('fonts/')) {
    const fn = path.basename(localRel);
    inlineCss = inlineCss.replaceAll(origUrl, `../fonts/${fn}`);
  } else if (localRel.startsWith('images/')) {
    const fn = path.basename(localRel);
    inlineCss = inlineCss.replaceAll(origUrl, `../images/${fn}`);
  }
}

fs.writeFileSync(path.join(PUBLIC_DIR, 'css', 'inline-styles.css'), inlineCss);
console.log('Updated public/css/inline-styles.css with local asset paths');

// 3. Process index.html: replace remote asset URLs with local relative paths
let indexHtml = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf-8');

// Replace all manifest entries in index.html
for (const [origUrl, localRel] of Object.entries(manifest)) {
  indexHtml = indexHtml.replaceAll(origUrl, localRel);
  try {
    const cleanUrl = origUrl.split('?')[0];
    indexHtml = indexHtml.replaceAll(cleanUrl, localRel);
  } catch(e){}
}

// Inject local CSS links into <head> of index.html
const headInject = `
  <!-- Extracted Local Stylesheets & Typography -->
  <link rel="stylesheet" href="css/typography.css">
  <link rel="stylesheet" href="css/inline-styles.css">
</head>`;

indexHtml = indexHtml.replace('</head>', headInject);

fs.writeFileSync(path.join(PUBLIC_DIR, 'index.html'), indexHtml);
console.log('Updated public/index.html with local links and stylesheets');

console.log('Post-processing complete!');
