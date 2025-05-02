import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'apollo-blue': '#1876D2',
        'apollo-light-blue': '#EBF3FB',
      },
      fontFamily: {
        'geist': ['Geist', 'Arial', 'sans-serif'],
        'geist-mono': ['Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;