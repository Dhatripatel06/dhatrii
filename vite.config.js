import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { rm, readdir } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * `public/` still holds the scraped reference-site dump (fonts, js, css and
 * hash-named images from framerusercontent.com). Vite copies everything in
 * publicDir into the build, which would add ~11.6MB of dead weight to every
 * deploy.
 *
 * This prunes that dump from the *output* only — nothing on disk is touched,
 * so the source tree is unchanged and the behaviour is host-agnostic.
 *
 * public/images is filtered rather than dropped, because that's also where the
 * site's own photos live. Scraped files there are long hash names with no
 * separators; real ones (portrait.jpg, kct-cafe.jpg) never match.
 */
const SCRAPED_DIRS = ['css', 'fonts', 'js', 'media']
const SCRAPED_FILES = ['typography.json', 'asset-manifest.json']

/**
 * `dist/assets` is shared ground: Vite emits the app bundle there, and the
 * scrape also had a public/assets. Only the scraped children may be removed —
 * deleting the directory takes the whole app with it.
 */
const SCRAPED_IN_ASSETS = ['fontshare', 'index.html']
const SCRAPED_ASSET_FILE = /^searchIndex-[A-Za-z0-9]+\.json$/

const HASHED_ASSET = /^[A-Za-z0-9]{20,}\.(png|jpe?g|svg|webp|gif|woff2?)$/

function pruneScrapedAssets() {
  return {
    name: 'prune-scraped-assets',
    apply: 'build',
    async closeBundle() {
      const out = join(process.cwd(), 'dist')

      await Promise.all([
        ...SCRAPED_DIRS.map((dir) => rm(join(out, dir), { recursive: true, force: true })),
        ...SCRAPED_FILES.map((file) => rm(join(out, file), { force: true })),
        ...SCRAPED_IN_ASSETS.map((entry) =>
          rm(join(out, 'assets', entry), { recursive: true, force: true }),
        ),
      ])

      // Scraped search index, but never the app bundle beside it.
      try {
        const assetsDir = join(out, 'assets')
        const assetNames = await readdir(assetsDir)
        await Promise.all(
          assetNames
            .filter((name) => SCRAPED_ASSET_FILE.test(name))
            .map((name) => rm(join(assetsDir, name), { force: true })),
        )
      } catch {
        // no assets directory — nothing to filter
      }

      let pruned = 0
      try {
        const imagesDir = join(out, 'images')
        const names = await readdir(imagesDir)
        await Promise.all(
          names
            .filter((name) => HASHED_ASSET.test(name))
            .map(async (name) => {
              await rm(join(imagesDir, name), { force: true })
              pruned += 1
            }),
        )
      } catch {
        // no images directory in the build — nothing to filter
      }

      console.log(`  prune-scraped-assets: removed scraped dirs + ${pruned} hashed images`)
    },
  }
}

export default defineConfig({
  plugins: [react(), pruneScrapedAssets()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          scroll: ['lenis'],
        },
      },
    },
  },
})
