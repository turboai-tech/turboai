// tailwind.config.js
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './messages/**/*.{js,ts,jsx,tsx,mdx}',
    './services/**/*.{js,ts,jsx,tsx,mdx}',
    './i18n/**/*.{js,ts,jsx,tsx,mdx}',
    './config/**/*.{js,ts,jsx,tsx,mdx}',
    './types/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-section-title": "linear-gradient(91deg, #FFF 32.88%, rgba(255, 255, 255, 0.40) 99.12%)",
        "hero-section-title-dark": "linear-gradient(91deg, #000 32.88%, rgba(0, 0, 0, 0.40) 99.12%)",
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
            opacity: '0'
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
      },
      animation: {
        appear: 'appear 1s ease-in-out',
        slide: 'slide 750ms ease-in-out',
        "scrolling-banner": "scrolling-banner var(--duration) linear infinite",
        "scrolling-banner-vertical": "scrolling-banner-vertical var(--duration) linear infinite",
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        'default-foreground': 'var(--default-foreground)',
        'default-background': 'var(--default-background)',
        'button-bg': 'var(--button-bg)',
        'button-text': 'var(--button-text)',
        'button-border': 'var(--button-border)',
        'button-hover': 'var(--button-hover)',
        'button-active': 'var(--button-active)',
        'button-disabled': 'var(--button-disabled)',

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
  backgroundImage: {
    "hero-section-title":
      "linear-gradient(91deg, #FFF 32.88%, rgba(255, 255, 255, 0.40) 99.12%)",
  },
  darkMode: "class",
  plugins: [heroui()],
};
export default config;
