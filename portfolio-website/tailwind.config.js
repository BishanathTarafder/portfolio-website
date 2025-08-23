/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        AAprimary: '#0f172a',
        AAsecondary: '#38bdf8',
        AAtertiary: '#112340',
        ResumeButtonHover: 'rgba(56,189,248,0.1)',
        MobileNavBarColor: '#1e293b',
        MobileNavColor: 'rgba(15,23,42,0.85)',
        'accent-color': '#38bdf8',
        white: '#e2e8f0',
        gray: {
          300: '#e2e8f0',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
        },
        blue: {
          500: '#38bdf8',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'monospace'],
        Header: ['Calibre', 'Inter', 'San Francisco', 'SF Pro Text', 'sans-serif'],
        Text2: ['Calibre', 'Inter', 'San Francisco', 'SF Pro Text', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};