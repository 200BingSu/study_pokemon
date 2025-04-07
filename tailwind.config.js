/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Vite 프로젝트에 맞는 파일 확장자 추가
  ],
  theme: {
    extend: {
      screens: {
        "sc-1400": "1400px",
        "sc-1164": "1164px",
        "sc-1140": "1140px",
      },
    },
  },
  plugins: [],
};
