import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/sections/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        solana: {
          start: '#00FFA3',
          end: '#DC1FFF'
        },
        zcash: '#F4B728',
        slate: {
          950: '#050a18',
          900: '#0B1026'
        }
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(0,255,163,0.2), rgba(220,31,255,0.1), transparent 70%)',
        'mesh-gradient': 'linear-gradient(120deg, rgba(0,255,163,0.18), rgba(220,31,255,0.12), rgba(244,183,40,0.08))'
      },
      boxShadow: {
        glow: '0 0 50px rgba(0,255,163,0.25)',
        'glow-strong': '0 0 60px rgba(220,31,255,0.30)'
      }
    }
  },
  plugins: []
};

export default config;

