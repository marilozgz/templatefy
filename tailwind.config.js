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
          50: '#21E5F2',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        daisy: {
          50: '#F4F5F7',
          100: '#F3F4F6',
          200: '#C9CCD4',
          300: '#A9ADB9',
          400: '#6B7280',
          500: '#2D3748',
          600: '#1D2939',
          700: '#111827',
          800: '#0C1723',
          900: '#070E16',
          accent: '#21E5F2',
          success: '#22C55E',
          warning: '#F9C74F',
          error: '#EF4444',
          info: '#00B4D8',
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    ({ addUtilities }) => {
      addUtilities({
        ".tab-custom":{
          borderRadius: '50px',
          fontWeight: 'bold',
          fontSize: '1rem',
          lineHeight: "0.2rem",
          padding: '0.1rem 2rem',
          backgroundColor: '#F4F5F7',
          color: 'black',
          cursor: 'pointer',
          border:"1px solid #000",
          margin: "0.15rem 1rem",
          display: "flex",
          
        },
        ".tab-custom:hover": {
          backgroundColor: '#000000',
          color: 'white'
        },
        ".tab-custom-active": {
          backgroundColor: '#000000',
          color: 'white'
        },        
        
        ".btn": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.75rem 1rem",
          fontSize: "1.2rem",
          lineHeight: "1.4",
          borderRadius: "50px",
          cursor: "pointer",
          fontWeight: "bold",
          outline: "none",
          border: "none",
          textTransform: "none"
          
        },
        ".btn:hover": {
          border: "2px solid #000000",
          lineHeight: "1.3",
        },
        
        
        ".btn-primary": {
          backgroundColor: "#21E5F2",
          color: "var(--color-myneutral)",
          borderColor: "2px solid #FFFFFF",
        },
        ".btn-primary:hover": {
          backgroundColor: "#FFFFFF",
          color: "black",
         
        },
        ".btn-secondary": {
          backgroundColor: "#000000",
          color: "white",
          
        },
        ".btn-secondary:hover": {
          backgroundColor: "#FFF",
          color: "black",
         
        }, 
        ".btn-link": {
          backgroundColor: "none",
          color: "#000000",
          border: "none",
          textDecoration: "none",
          
        },
        ".selected": {
          backgroundColor: "none",
          color: "#21E5F2"
        }
       
      });
    }
  ],
}
