
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['RetroSerif', 'serif'],
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        "ps-green": "#385d41",
        "ps-tan": "#dfbe73",
        "ps-sage": "#7e976d",
        "ps-cream": "#ede6d2",
        "ps-brown": "#5d4f4d",
        "ps-beige": "#af9f86",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        serif: ["'RetroSerif'", "serif"],
      },
      fontSize: {},
      boxShadow: {
        'ps': '0 4px 0 0 #7e976d',
      },
      backgroundImage: {
        'grain': "url('/textures/grain.png')",
        'crt-scanline': "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
        'ps-gradient': "linear-gradient(135deg, #385d41, #7e976d)",
        'jp-gradient': "linear-gradient(135deg, #dfbe73, #ede6d2)",
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
  plugins: [],
};
