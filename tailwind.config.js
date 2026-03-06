/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0E1A',
        parchment: '#F2E8D5',
        crimson: '#C0392B',
        gold: '#D4A853',
        olive: '#6B7A3A',
        smoke: '#1E2535',
        ash: '#8B95A8',
        red: {
          800: '#7a0014'
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        body: ['Noto Serif', 'serif'],
      }
    }
  },
  plugins: []
}
