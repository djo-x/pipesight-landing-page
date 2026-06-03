import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          amber: '#F59E0B',
          dark: '#BA7517',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#0F172A',
        },
      },
    },
  },
  plugins: [],
}

export default config
