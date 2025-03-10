/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        "ps-green": "rgb(56, 93, 65)",
        "ps-tan": "rgb(223, 190, 115)",
        "ps-sage": "rgb(126, 151, 109)",
        "ps-cream": "rgb(237, 230, 210)",
        "ps-brown": "rgb(93, 79, 77)",
        "ps-beige": "rgb(175, 159, 134)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        serif: ["'RetroSerif'", "serif"],
      },
      fontSize: {},
      boxShadow: {
        'ps': '0 4px 0 0 rgb(126, 151, 109)',
      },
      backgroundImage: {
        'grain': "url('/textures/grain.png')",
        'crt-scanline': "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
        'ps-gradient': "linear-gradient(135deg, rgb(56, 93, 65), rgb(126, 151, 109))",
        'jp-gradient': "linear-gradient(135deg, rgb(223, 190, 115), rgb(237, 230, 210))",
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'ps-loading': 'ps-loading 1.5s infinite ease-in-out',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'ps-loading': {
          '0%, 100%': { transform: 'translateY(-50%) scale(0.8)', opacity: 0.5 },
          '50%': { transform: 'translateY(-50%) scale(1.2)', opacity: 1 },
        },
      },
    },
  },
  darkMode: "media",
  plugins: [],
};

export default config;
