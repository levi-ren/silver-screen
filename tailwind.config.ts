import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#050609",
        white: "#EFF1F3",
        blue: {
          "50": "#f1f9fe",
          "100": "#e2f2fc",
          "200": "#bee5f9",
          "300": "#85cff4",
          "400": "#44b7ec",
          "500": "#1c9fdb",
          "600": "#0e79b2",
          "700": "#0d6597",
          "800": "#0f567d",
          "900": "#124768",
          "950": "#0c2e45",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        quicksand: ["var(--font-quicksand)"],
        bebas: ["var(--font-bebas)"],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "",
        },
        ".show-scrollbar::-webkit-scrollbar": {
          display: "block",
        },
        ".show-scrollbar": {
          "-ms-overflow-style": "auto",
          "scrollbar-width": "auto",
        },
        ".hidden-scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: "transparent",
        },
        ".display-scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: "#ffffff26",
        },
        ".small-caps": {
          "font-variant": "small-caps",
        },
      });
    }),
  ],
};
export default config;
