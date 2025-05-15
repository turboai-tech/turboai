// tailwind.config.js
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
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
        }
      },
      animation: {
        appear: 'appear 1s ease-in-out',
        slide: 'slide 750ms ease-in-out'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        // sidebar: {
        //   DEFAULT: 'hsl(var(--sidebar-background))',
        //   foreground: 'hsl(var(--sidebar-foreground))',
        //   primary: 'hsl(var(--sidebar-primary))',
        //   'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
        //   accent: 'hsl(var(--sidebar-accent))',
        //   'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
        //   border: 'hsl(var(--sidebar-border))',
        //   ring: 'hsl(var(--sidebar-ring))'
        // }
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
