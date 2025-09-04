/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220, 15%, 5%)',
        accent: 'hsl(180, 90%, 45%)',
        primary: 'hsl(240, 80%, 50%)',
        surface: 'hsl(220, 15%, 10%)',
        'on-surface': 'hsl(220, 10%, 90%)',
      },
      borderRadius: {
        'lg': '14px',
        'md': '10px',
        'sm': '6px',
      },
      spacing: {
        'lg': '16px',
        'md': '12px',
        'sm': '8px',
      },
      boxShadow: {
        'card': '0 4px 16px hsla(0, 0%, 0%, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
      },
    },
  },
  plugins: [],
};
