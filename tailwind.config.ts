import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D0C3E", // Deep blue
        secondary: "#47006C", // Rich purple
        accent: "#FF6A00", // Orange for contrast
        roseRed: "#B22222", // Deep Rose Red for metal aesthetics
        rose: "#e50609", // Custom rose color
      },
      fontFamily: {
        metal: ['Metal Mania', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
