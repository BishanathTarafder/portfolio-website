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
        AAprimary: '#0a192f',
        AAsecondary: '#64ffda',
        AAtertiary: '#112340',
        ResumeButtonHover: 'rgba(100,255,218,0.1)',
        MobileNavBarColor: '#112340',
        MobileNavColor: 'rgba(10,25,47,0.85)',
        primary: {
          50: '#f0f7ff',
          100: '#e0eefe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36aaf5',
          500: '#0c8ee7',
          600: '#0070c4',
          700: '#0059a0',
          800: '#064b85',
          900: '#0a406e',
          950: '#072a4a',
        },
        accent: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
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