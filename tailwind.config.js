/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        blue: '#3B82F6',
        'dark-blue': '#1E3A8A',
        black: '#000000',
        white: '#FFFFFF',
        yellow: '#EAB308',
        red: '#EF4444',
        green: '#10B981',
        orange: '#F97316',
        bs: {
          primary: '#0284C7',      // Deep Sky Blue
          secondary: '#0EA5E9',    // Sky Blue
          success: '#22C55E',      // Green Success
          info: '#06B6D4',         // Cyan Info
          warning: '#F59E0B',      // Amber Warning
          danger: '#EF4444',       // Red Danger
          light: '#0C4A6E',        // Dark Sky Blue Text
          dark: '#FFFFFF',         // White card surfaces
          'dark-bg': '#F0F9FF',    // Very Light Sky Background
          body: '#0C4A6E',         // Dark Sky Blue
        },
        brand: {
          primary: '#0284C7',      // Deep Sky Blue
          secondary: '#0EA5E9',    // Sky Blue
          accent: '#06B6D4',       // Cyan Accent
          success: '#22C55E',      // Green Success
          info: '#06B6D4',         // Cyan Info
          warning: '#F59E0B',      // Amber Warning
          danger: '#EF4444',       // Red Danger
          bg: '#F0F9FF',           // Very Light Sky background
          surface: '#FFFFFF',      // Pure White surfaces
          border: '#E0F2FE',       // Light Sky Blue border
          text: '#0C4A6E',         // Dark Sky Blue text
          muted: '#94A3B8',        // Slate Gray muted text
        },
        // Extended Sky Blue Palette
        sky: {
          50: '#F0F9FF',   // Almost white
          100: '#E0F2FE',  // Very light blue
          200: '#BAE6FD',  // Light blue
          300: '#7DD3FC',  // Medium light blue
          400: '#38BDF8',  // Medium blue
          500: '#0EA5E9',  // Sky blue
          600: '#0284C7',  // Deep sky blue (primary)
          700: '#0369A1',  // Darker sky blue
          800: '#075985',  // Dark sky blue
          900: '#0C4A6E',  // Very dark sky blue (text)
        },
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
      },
      boxShadow: {
        soft: '0 4px 12px rgba(3, 105, 161, 0.1)',
        'soft-lg': '0 8px 24px rgba(3, 105, 161, 0.15)',
        'soft-xl': '0 20px 48px rgba(3, 105, 161, 0.2)',
      },
    },
  },
  plugins: [],
};