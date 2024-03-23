import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-NeuMontrealRegular)'],

      },
      colors: {
        link: "#0070f3", // link
        primary: "#0e1129",
        light: "#f8f8f8",
      },
      backgroundColor: {
        primary: "#F9F9F9",
        secondary: "#f8f8f8",
      },
      fontSize: {
        heading: ["3rem", "2.2rem"],
        subheading: ["1.6rem", "1.8rem"],
        body: ["1.4rem", "1.6rem"],
        caption: ["1.2rem", "1.4rem"],
        small: ["1rem", "1.2rem"],
        tiny: ["0.8rem", "1rem"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
