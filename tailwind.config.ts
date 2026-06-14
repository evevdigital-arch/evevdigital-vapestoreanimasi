import type { Config } from 'tailwindcss';
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Inter Tight"', 'sans-serif'],
        body: ['"Inter Tight"', 'sans-serif'],
        sans: ['"Inter Tight"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
