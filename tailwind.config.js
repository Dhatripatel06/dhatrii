/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
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
        accent: {
          DEFAULT: '#4CC9FF',
          dim: '#2BA6DE',
        },
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        // Pixel-block face used for the big stat numerals.
        pixel: ['Handjet', 'monospace'],
      },
      fontSize: {
        // Hero headline — exact reference sizes per breakpoint.
        'hero-mobile': ['42px', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'hero-tablet': ['64px', { lineHeight: '0.98', letterSpacing: '-0.032em' }],
        'hero-desktop': ['88px', { lineHeight: '0.96', letterSpacing: '-0.035em' }],
        headline: ['clamp(2rem, 4.2vw, 3.25rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        title: ['clamp(1.25rem, 1.9vw, 1.625rem)', { lineHeight: '1.24', letterSpacing: '-0.018em' }],
        lede: ['17px', { lineHeight: '1.7' }],
      },
      maxWidth: {
        shell: '736px', // 640px content + gutters, matching the reference
        nav: '640px', // floating navbar pill
        lede: '520px', // hero supporting paragraph
      },
      borderRadius: {
        card: '32px',
        frame: '44px',
        inner: '36px',
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.08)',
      },
      boxShadow: {
        card: '0 20px 60px rgba(0,0,0,0.45)',
        nav: '0 12px 40px rgba(0,0,0,0.55)',
        glow: '0 16px 44px -18px rgba(76,201,255,0.42)',
      },
      spacing: {
        'nav-h': '64px',
        'nav-w': '760px',
        'sec-sm': '64px',
        'sec-md': '88px',
        'sec-lg': '120px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        blip: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.8)' },
        },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        blip: 'blip 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
