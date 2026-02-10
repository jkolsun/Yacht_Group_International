import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#080808',
          panel: '#0c0c0c',
          light: '#111111',
        },
        navy: '#0d1b2a',
        gold: {
          DEFAULT: '#c9a96e',
          dim: 'rgba(201, 169, 110, 0.4)',
          glow: 'rgba(201, 169, 110, 0.08)',
        },
        cream: {
          DEFAULT: '#f0ebe3',
          dim: '#9e978c',
        },
        white: '#fafaf8',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Cormorant Garamond', 'Times New Roman', 'serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      transitionTimingFunction: {
        'ease-out-custom': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      animation: {
        'ken-burns': 'kenBurns 20s linear infinite alternate',
        'scroll-drop': 'scrollDrop 2.2s ease-in-out infinite',
        'loader-fade': 'loaderFade 1s 0.3s ease-out forwards',
        'loader-out': 'loaderOut 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-1%, -0.5%)' },
        },
        scrollDrop: {
          '0%': { top: '-100%' },
          '50%': { top: '100%' },
          '100%': { top: '100%' },
        },
        loaderFade: {
          to: { opacity: '1' },
        },
        loaderOut: {
          '0%': { clipPath: 'inset(0 0 0 0)' },
          '100%': { clipPath: 'inset(0 0 100% 0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
