/**
 * Design system notes:
 * - Warm white canvas with a single deep accent color for clarity and visual focus.
 * - The site uses a soft editorial radius and layered shadows to feel premium but still minimal.
 * - The repeated signature detail is the browser-like project frame used across the case-study cards.
 */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FAFAF8',
        surface: '#FFFFFF',
        ink: '#111114',
        muted: '#6B7280',
        primary: '#1D4ED8',
        'primary-dark': '#1E3A8A',
        'primary-light': '#DBEAFE',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        primary: '0 12px 40px rgba(29, 78, 216, 0.12)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(circle at top left, rgba(29,78,216,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(20,184,166,0.12), transparent 28%)',
      },
    },
  },
  plugins: [],
};
