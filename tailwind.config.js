/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': { 'min': '320px', 'max': '664px' }, // Adjusted max to avoid overlap with 'MobileLandscape'
        'mobileLandscape': { 'min': '665px', 'max': '767px' }, // Updated to avoid overlap with 'Tablet'
        'tablet': { 'min': '768px', 'max': '1023px' }, 
        'ipad': { 'min': '1024px', 'max': '1139px' }, 
        'miniDesktop': { 'min': '1140px', 'max': '1367px' }, // Adjusted range to avoid overlap with 'Ipad'
        'desktop': { 'min': '1368px' }, // Set as a breakpoint for larger screens
      },
      
      container: {
        center: true,
        screens: {
          'desktop': "1108px",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        "tw-40": "2.5rem",
      },
      colors: {
        "color-primary" : "#909090",
        "color-secondary" : "#EBE2E2",
        "dashboard-gray": "#fbf9f9",
        "color-purple" : "#5D17E9",
        "color-red" : "#D83E3A"
      },
      boxShadow: {
        "chatShadow" : "0px 2px 17px -3px #d8d8d8cc"
      },
      animation: {
        sideways: "sideways 1s linear infinite",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Set Montserrat as the default sans-serif font
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.min-h-calc': {
          minHeight: 'calc(100vh - 68px)',
        },
        '.h-calc': {
          height: 'calc(100vh - 100px)',
        },
        '.calc-content': {
          width: 'calc(100% - 300px)',
        },
      });
    },
  ],
}
