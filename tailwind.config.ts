import type { Config } from "tailwindcss";

// Tailwind v4: theme tokens đã chuyển sang @theme trong globals.css.
// File này chỉ còn cần để khai báo content scan paths.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
};

export default config;
