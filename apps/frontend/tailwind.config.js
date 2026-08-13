/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色：森林綠
        forest: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#2D6A4F',  // 品牌主色
          700: '#1e5c42',
          800: '#166534',
          900: '#14532d',
        },
        // 輔色：暖橙（食物/溫暖感）
        harvest: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#F4845F',  // 品牌輔色
          600: '#ea6c3e',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // 土地色（背景）
        earth: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Noto Sans TC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
