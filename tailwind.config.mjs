/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      /* Grounds sampled from the reference: page #111, lifted cards #1A1A1A,
         recessed panels #0A0A0A. The accent is a deliberate departure — an
         azure in place of the reference's lime. #4CC9FF holds ~9.7:1 against
         #111111, so it works both as text on the page and as a fill with
         bg-coloured text on top. */
      colors: {
        bg: '#111111',
        surface: '#1A1A1A',
        sunken: '#0A0A0A',
        raised: '#222222',
        line: 'rgba(255,255,255,0.08)',
        text: '#F5F5F5',
        muted: '#A1A1AA',
        accent: '#4CC9FF',
      },
      /* Faces are loaded by next/font in app/layout.jsx, which exposes each
         one as a CSS variable carrying its metric-adjusted fallback stack. */
      fontFamily: {
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-poppins)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        // Pixel-block face used for the big stat numerals.
        pixel: ['var(--font-handjet)', 'monospace'],
      },
      maxWidth: {
        nav: '640px', // floating navbar pill
        lede: '520px', // hero supporting paragraph
      },
      borderRadius: {
        card: '32px',
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.08)',
      },
      boxShadow: {
        card: '0 20px 60px rgba(0,0,0,0.45)',
      },
      spacing: {
        'nav-h': '64px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
