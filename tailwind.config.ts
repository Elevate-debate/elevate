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
        surface: '#ffffff',
        paper: {
          DEFAULT: '#E6E1F9',
          deep: '#DCD4F5',
          surface: '#ffffff',
        },
        ink: {
          DEFAULT: '#202620',
          soft: '#5c625b',
        },
        rule: '#D2C7F0',
        accent: {
          DEFAULT: '#b64b35',
          dark: '#8e3526',
          wash: '#f2ddd6',
        },
        sage: '#536b59',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      boxShadow: {
        editorial: '5px 5px 0 rgba(32, 38, 32, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
