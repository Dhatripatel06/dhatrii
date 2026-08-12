import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_URL = 'https://same-galaxy-447880.framer.app/';
const BASE_DOMAIN = 'https://same-galaxy-447880.framer.app';
const PUBLIC_DIR = path.join(__dirname, 'public');

// Ensure directories exist
const dirs = [
  PUBLIC_DIR,
  path.join(PUBLIC_DIR, 'css'),
  path.join(PUBLIC_DIR, 'fonts'),
  path.join(PUBLIC_DIR, 'images'),
  path.join(PUBLIC_DIR, 'js'),
  path.join(PUBLIC_DIR, 'media'),
  path.join(PUBLIC_DIR, 'assets')
];

dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

const downloadedUrls = new Map(); // original URL -> local relative path
const urlQueue = new Set();
const visitedJsCss = new Set();

function sanitizeFilename(urlStr) {
  try {
    const u = new URL(urlStr);
    let pathname = u.pathname;
    if (pathname === '/' || !pathname) pathname = 'index.html';
    let ext = path.extname(pathname);
    let basename = path.basename(pathname, ext);
    // sanitize basename
    basename = basename.replace(/[^a-zA-Z0-9_\-]/g, '_');
    if (basename.length > 50) basename = basename.substring(0, 50);
    return { basename, ext: ext.toLowerCase(), fullPath: u.pathname };
  } catch (e) {
    return { basename: 'asset_' + Math.random().toString(36).substring(2, 8), ext: '', fullPath: urlStr };
  }
}

function getSubdirAndName(urlStr, contentType = '') {
  const { basename, ext } = sanitizeFilename(urlStr);
  let category = 'assets';
  let finalExt = ext;

  if (['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.svg', '.ico'].includes(ext)) {
    category = 'images';
  } else if (['.woff2', '.woff', '.ttf', '.otf', '.eot'].includes(ext)) {
    category = 'fonts';
  } else if (['.css'].includes(ext) || contentType.includes('css')) {
    category = 'css';
    if (!finalExt) finalExt = '.css';
  } else if (['.js', '.mjs'].includes(ext) || contentType.includes('javascript')) {
    category = 'js';
    if (!finalExt) finalExt = '.js';
  } else if (['.mp4', '.webm', '.ogg', '.mp3', '.wav'].includes(ext)) {
    category = 'media';
  } else if (urlStr.includes('framerusercontent.com/assets/')) {
    // Check if it's a font or image without explicit extension
    if (contentType.includes('font') || contentType.includes('woff')) {
      category = 'fonts';
      if (!finalExt) finalExt = '.woff2';
    } else if (contentType.includes('image')) {
      category = 'images';
    }
  }

  // Hash query or URL to ensure unique filenames
  let hash = '';
  try {
    const u = new URL(urlStr);
    if (u.search) {
      let qHash = 0;
      for (let i = 0; i < u.search.length; i++) qHash = (qHash << 5) - qHash + u.search.charCodeAt(i);
      hash = '_' + Math.abs(qHash).toString(36);
    }
  } catch (e) {}

  const filename = `${basename}${hash}${finalExt}`;
  return { category, filename, relPath: `${category}/${filename}` };
}

async function fetchWithRetry(url, isBinary = true) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const contentType = res.headers.get('content-type') || '';
    if (isBinary) {
      const buffer = Buffer.from(await res.arrayBuffer());
      return { data: buffer, contentType };
    } else {
      const text = await res.text();
      return { data: text, contentType };
    }
  } catch (err) {
    console.error(`Failed to fetch ${url}: ${err.message}`);
    return null;
  }
}

function resolveUrl(relativeUrl, baseUrl = TARGET_URL) {
  try {
    if (relativeUrl.startsWith('//')) return 'https:' + relativeUrl;
    return new URL(relativeUrl, baseUrl).href;
  } catch (e) {
    return null;
  }
}

// Extract URLs from CSS text
function extractUrlsFromCss(cssText, baseUrl) {
  const urls = [];
  // match url(...)
  const urlRegex = /url\((?:['"]?)(.*?)(?:['"]?)\)/g;
  let match;
  while ((match = urlRegex.exec(cssText)) !== null) {
    let u = match[1].trim();
    if (u && !u.startsWith('data:')) {
      const resolved = resolveUrl(u, baseUrl);
      if (resolved) urls.push(resolved);
    }
  }
  // match @import
  const importRegex = /@import\s+(?:url\()?['"]?(.*?)['"]?\)?;/g;
  while ((match = importRegex.exec(cssText)) !== null) {
    let u = match[1].trim();
    if (u && !u.startsWith('data:')) {
      const resolved = resolveUrl(u, baseUrl);
      if (resolved) urls.push(resolved);
    }
  }
  return urls;
}

// Extract URLs from JS text
function extractUrlsFromJs(jsText, baseUrl) {
  const urls = [];
  // Framer asset patterns: https://framerusercontent.com/...
  const framerUrlRegex = /https:\/\/[a-zA-Z0-9_\-\.\/]+\.(png|jpg|jpeg|webp|avif|svg|gif|woff2|woff|ttf|otf|mp4|webm|css|js)/gi;
  let match;
  while ((match = framerUrlRegex.exec(jsText)) !== null) {
    urls.push(match[0]);
  }

  // Any framerusercontent.com asset URL
  const genericFramerRegex = /https:\/\/framerusercontent\.com\/[a-zA-Z0-9_\-\.\/]+/gi;
  while ((match = genericFramerRegex.exec(jsText)) !== null) {
    let u = match[0].replace(/['"\)\],;]+$/, '');
    urls.push(u);
  }

  // Google fonts or external font URLs
  const gfontsRegex = /https:\/\/fonts\.(gstatic|googleapis)\.com\/[a-zA-Z0-9_\-\.\/\?=\+]+/gi;
  while ((match = gfontsRegex.exec(jsText)) !== null) {
    let u = match[0].replace(/['"\)\],;]+$/, '');
    urls.push(u);
  }

  return Array.from(new Set(urls));
}

async function processAsset(url, isJsOrCss = false) {
  if (downloadedUrls.has(url)) return downloadedUrls.get(url);

  console.log(`Downloading: ${url}`);
  const result = await fetchWithRetry(url, true);
  if (!result) return null;

  const { data, contentType } = result;
  const { category, filename, relPath } = getSubdirAndName(url, contentType);
  const targetPath = path.join(PUBLIC_DIR, relPath);

  fs.writeFileSync(targetPath, data);
  downloadedUrls.set(url, relPath);

  // If CSS or JS, search for nested assets
  const textContent = (category === 'css' || category === 'js' || contentType.includes('javascript') || contentType.includes('css'))
    ? data.toString('utf-8')
    : null;

  if (textContent && !visitedJsCss.has(url)) {
    visitedJsCss.add(url);
    let nestedUrls = [];
    if (category === 'css' || contentType.includes('css')) {
      nestedUrls = extractUrlsFromCss(textContent, url);
    } else {
      nestedUrls = extractUrlsFromJs(textContent, url);
    }

    for (const nUrl of nestedUrls) {
      if (!downloadedUrls.has(nUrl)) {
        await processAsset(nUrl, true);
      }
    }
  }

  return relPath;
}

async function main() {
  console.log(`Fetching main page: ${TARGET_URL}`);
  const mainResult = await fetchWithRetry(TARGET_URL, false);
  if (!mainResult) {
    console.error('Failed to load main page HTML');
    return;
  }

  const html = mainResult.data;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'index.html'), html);

  // Parse HTML for links, scripts, images, etc.
  const assetUrls = new Set();

  // 1. Link stylesheet / preload / icons
  const linkRegex = /<link[^>]+href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const resolved = resolveUrl(match[1]);
    if (resolved) assetUrls.add(resolved);
  }

  // 2. Script src
  const scriptRegex = /<script[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = scriptRegex.exec(html)) !== null) {
    const resolved = resolveUrl(match[1]);
    if (resolved) assetUrls.add(resolved);
  }

  // 3. Img src & srcset
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = imgRegex.exec(html)) !== null) {
    const resolved = resolveUrl(match[1]);
    if (resolved) assetUrls.add(resolved);
  }

  const srcsetRegex = /srcset=["']([^"']+)["']/gi;
  while ((match = srcsetRegex.exec(html)) !== null) {
    const candidates = match[1].split(',');
    for (const c of candidates) {
      const parts = c.trim().split(/\s+/);
      if (parts[0]) {
        const resolved = resolveUrl(parts[0]);
        if (resolved) assetUrls.add(resolved);
      }
    }
  }

  // 4. Source tags in video/picture
  const sourceRegex = /<source[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = sourceRegex.exec(html)) !== null) {
    const resolved = resolveUrl(match[1]);
    if (resolved) assetUrls.add(resolved);
  }

  // 5. CSS from style tags
  const styleBlockRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let combinedInlineCss = '';
  while ((match = styleBlockRegex.exec(html)) !== null) {
    combinedInlineCss += match[1] + '\n';
    const extracted = extractUrlsFromCss(match[1], TARGET_URL);
    extracted.forEach(u => assetUrls.add(u));
  }

  // 6. Generic regex for framerusercontent URLs in HTML body
  const bodyFramerUrls = extractUrlsFromJs(html, TARGET_URL);
  bodyFramerUrls.forEach(u => assetUrls.add(u));

  console.log(`Found ${assetUrls.size} unique asset URLs in initial HTML scan.`);

  // Process all discovered assets
  for (const url of assetUrls) {
    await processAsset(url, true);
  }

  // Extract CSS stylesheet and combined inline CSS
  console.log('Extracting combined CSS...');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'css', 'inline-styles.css'), combinedInlineCss);

  // Extract Typography & Font Definitions
  console.log('Extracting typography and font details...');
  const fontFaceRegex = /@font-face\s*\{[^}]+\}/gi;
  const fontFaces = [];
  let ffMatch;
  while ((ffMatch = fontFaceRegex.exec(combinedInlineCss)) !== null) {
    fontFaces.push(ffMatch[0]);
  }

  // Extract typography declarations (font-family, font-size, font-weight, line-height, letter-spacing, etc.)
  const typographyRules = [];
  const ruleRegex = /([^{}]+)\{([^}]+)\}/g;
  let ruleMatch;
  while ((ruleMatch = ruleRegex.exec(combinedInlineCss)) !== null) {
    const selector = ruleMatch[1].trim();
    const body = ruleMatch[2].trim();

    if (body.includes('font-family') || body.includes('font-size') || body.includes('font-weight') || body.includes('line-height') || body.includes('letter-spacing')) {
      const props = {};
      body.split(';').forEach(p => {
        const [k, v] = p.split(':').map(s => s ? s.trim() : '');
        if (k && v && (k.startsWith('font') || k.startsWith('line-height') || k.startsWith('letter-spacing') || k.startsWith('color') || k.startsWith('text-'))) {
          props[k] = v;
        }
      });
      if (Object.keys(props).length > 0) {
        typographyRules.push({ selector, styles: props });
      }
    }
  }

  const typographyData = {
    fontFaces: fontFaces,
    rules: typographyRules,
    downloadedFonts: Array.from(downloadedUrls.entries())
      .filter(([url, rel]) => rel.startsWith('fonts/'))
      .map(([url, rel]) => ({ originalUrl: url, localPath: rel }))
  };

  fs.writeFileSync(path.join(PUBLIC_DIR, 'typography.json'), JSON.stringify(typographyData, null, 2));

  // Generate typography CSS
  let typographyCss = `/* Extracted @font-face rules and Typography Styles */\n\n`;
  fontFaces.forEach(ff => {
    typographyCss += ff + '\n\n';
  });
  typographyCss += `/* Typography Rules */\n`;
  typographyRules.forEach(r => {
    typographyCss += `${r.selector} {\n`;
    for (const [k, v] of Object.entries(r.styles)) {
      typographyCss += `  ${k}: ${v};\n`;
    }
    typographyCss += `}\n\n`;
  });
  fs.writeFileSync(path.join(PUBLIC_DIR, 'css', 'typography.css'), typographyCss);

  // Write Asset Manifest
  const manifest = {};
  for (const [origUrl, localRel] of downloadedUrls.entries()) {
    manifest[origUrl] = localRel;
  }
  fs.writeFileSync(path.join(PUBLIC_DIR, 'asset-manifest.json'), JSON.stringify(manifest, null, 2));

  console.log('=== ASSET EXTRACTION COMPLETE ===');
  console.log(`Total Assets Downloaded: ${downloadedUrls.size}`);
  console.log(`Assets saved in: ${PUBLIC_DIR}`);
}

main();
