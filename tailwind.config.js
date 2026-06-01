export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: "#35B8BE",
        bgLight: "#F5F7F6",
        textDark: "#08090A",
        textGray: "#546285",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "20px",
      },
    },
  },
  plugins: [],
};
