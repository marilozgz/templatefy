const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"]
      },
      colors: {
        primary: '#21E5F2',
        secondary: '#000000',
        neutral: '#FFFFFF',
        myprimary: '#FF5722',
        mysecondary: '#607D8B',
        myneutral: '#212121',
        base: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      }
    },
    variants: {},
    plugins: [
      require('daisyui')
    ]
  },
  plugins: [
    require("daisyui"),
    ({ addUtilities }) => {
      addUtilities({
        ".btn": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: ".5rem 1rem",
          fontSize: "1rem",
          lineHeight: "1.5",
          borderRadius: "300px",
          cursor: "pointer",
          transition: "background-color 0.15s, color 0.15s",
          borderColor: "var(--color-base-100)",
          textTransform: "none",
          fontSize:"18px"
        },
        ".btn:hover": {
          backgroundColor: "var(--color-myprimary)",
          color: "var(--color-mybase100)",
          borderColor: "var(--color-myprimary)"
        },
        ".btn-primary": {
          backgroundColor: "#21E5F2",
          color: "var(--color-myneutral)",
          borderColor: "#FFFFFF"
        },
        ".btn-primary:hover": {
          backgroundColor: "var(--color-black)",
          color: "black"
        },
        ".btn-secondary": {
          backgroundColor: "#000000",
          color: "white",
          borderColor: "#000000"
        },
        ".btn-secondary:hover": {
          backgroundColor: "#FFF",
          color: "#000000"
        }
      });
    }
  ]
};
