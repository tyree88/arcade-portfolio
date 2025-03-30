/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // Adjusted paths to match the new structure using src/app
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // Removed ./src/pages as we are using the app router
  ],
  theme: {
    extend: {
      colors: {
        // Using the CSS variable definitions from globals.css
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        "ps-green": "rgb(var(--ps-green) / <alpha-value>)",
        "ps-tan": "rgb(var(--ps-tan) / <alpha-value>)",
        "ps-sage": "rgb(var(--ps-sage) / <alpha-value>)",
        "ps-cream": "rgb(var(--ps-cream) / <alpha-value>)",
        "ps-brown": "rgb(var(--ps-brown) / <alpha-value>)",
        "ps-beige": "rgb(var(--ps-beige) / <alpha-value>)",
      },
      fontFamily: {
        // Keeping the font definitions, ensure these variables are set up in layout.tsx if used
        'serif': ['var(--font-geist-sans)', 'serif'],
        'mono': ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config