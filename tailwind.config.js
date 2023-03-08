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
    theme: {
      extend: {
        fontFamily: {
          nunito: ["Nunito", "sans-serif"]
        },
      },
    },
    variants: {},
    plugins: [
      require('daisyui'),
    ],
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
          borderColor: "var(--color-myprimary)",
        },
        ".btn-primary:hover": {
          backgroundColor: "var(--color-base-200)",
          color: "black",
        },
        ".btn-secondary": {
          backgroundColor: "#000000",
          color: "white",
          borderColor: "var(--color-mysecondary)",
        },
        ".btn-secondary:hover": {
          backgroundColor: "var(--color-mybase100)",
          color: "var(--color-mysecondary)",
        },
      });
    },
  ],
};
