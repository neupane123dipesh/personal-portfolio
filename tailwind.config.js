/**
 * Design system notes:
 * - Soft ivory canvas paired with a vivid indigo-violet accent for a premium editorial look.
 * - The site uses layered glass surfaces, subtle motion, and a refined display type for a more creative feel.
 * - The signature motion language is a floating, layered card system that gives the portfolio depth.
 */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F7F4F0',
        surface: '#FFFFFF',
        ink: '#121321',
        muted: '#5F6474',
        primary: '#5F5CF1',
        'primary-dark': '#4A43D0',
        'primary-light': '#E8E5FF',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Manrope"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        primary: '0 22px 60px rgba(95, 92, 241, 0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(circle at top left, rgba(95,92,241,0.24), transparent 28%), radial-gradient(circle at bottom right, rgba(56,189,248,0.18), transparent 30%), radial-gradient(circle at center, rgba(251,191,36,0.12), transparent 35%)',
      },
    },
  },
  plugins: [],
};
