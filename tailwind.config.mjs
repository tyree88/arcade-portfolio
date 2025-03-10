/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
<<<<<<< HEAD
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        "ps-green": "rgb(var(--ps-green) / <alpha-value>)",
        "ps-tan": "rgb(var(--ps-tan) / <alpha-value>)",
        "ps-sage": "rgb(var(--ps-sage) / <alpha-value>)",
        "ps-cream": "rgb(var(--ps-cream) / <alpha-value>)",
        "ps-brown": "rgb(var(--ps-brown) / <alpha-value>)",
        "ps-beige": "rgb(var(--ps-beige) / <alpha-value>)",
=======
        'ps-green': '#385d41',
        'ps-tan': '#dfbe73',
        'ps-sage': '#7e976d',
        'ps-cream': '#ede6d2',
        'ps-brown': '#5d4f4d',
>>>>>>> c645395 (Assistant checkpoint: Implement 3D arcade machine showcase)
      },
      fontFamily: {
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