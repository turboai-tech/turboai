import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    './messages/**/*.{js,ts,jsx,tsx,mdx}',
    './services/**/*.{js,ts,jsx,tsx,mdx}',
    './i18n/**/*.{js,ts,jsx,tsx,mdx}',
    './config/**/*.{js,ts,jsx,tsx,mdx}',
    './types/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-section-title': 'var(--hero-title-gradient)',
      },
      fontFamily: {
        sans: [
          'var(--font-sans)'
        ],
        mono: [
          'var(--font-mono)'
        ]
      },
      keyframes: {
        appear: {
          from: {
            opacity: '0.5'
          },
          to: {
            opacity: '1'
          }
        },
        slide: {
          from: {
            transform: 'translateX(100%)'
          },
          to: {
            transform: 'translateX(0%)'
          }
        },
        "scrolling-banner": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - var(--gap)/2))" },
        },
        "scrolling-banner-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-50% - var(--gap)/2))" },
        },
        'pulse-border': { // 与 CSS 中的 keyframes 名称一致
          '0%': {
            boxShadow: '0 0 0 0 rgba(168, 85, 247, 0.7)', // purple-500
          },
          '70%': {
            boxShadow: '0 0 0 10px rgba(168, 85, 247, 0)',
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(168, 85, 247, 0)',
          },
        },
        'voice-glow': { // 注册 voice-glow 动画
          '0%, 100%': {
            boxShadow: '0 0 5px 2px rgba(192, 132, 252, 0.5), 0 0 7px 3px rgba(168, 85, 247, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 10px 4px rgba(192, 132, 252, 0.7), 0 0 15px 6px rgba(168, 85, 247, 0.5)',
          },
        }
      },
      animation: {
        appear: 'appear 1s ease-in-out',
        slide: 'slide 750ms ease-in-out',
        "scrolling-banner": "scrolling-banner var(--duration) linear infinite",
        "scrolling-banner-vertical": "scrolling-banner-vertical var(--duration) linear infinite",
        'pulse-border': 'pulse-border 2s infinite',
        'voice-glow': 'voice-glow 2.5s ease-in-out infinite',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      },
    }
  },
  darkMode: "class",
  plugins: [heroui()],
};
export default config;
