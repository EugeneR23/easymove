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
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E4C97E',
          dark: '#9E7A2E',
          50: '#FDF8EC',
          100: '#F9EFD0',
        },
        charcoal: {
          DEFAULT: '#1C1C1E',
          light: '#2C2C2E',
          soft: '#3A3A3C',
        },
        cream: '#FAF8F3',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        luxury: '0 4px 32px rgba(201, 168, 76, 0.15)',
        card: '0 2px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.14)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A84C 0%, #E4C97E 50%, #9E7A2E 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
