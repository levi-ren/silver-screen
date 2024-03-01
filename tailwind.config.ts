import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        quicksand: ["var(--font-quicksand)"],
        bebas: ["var(--font-bebas)"],
      },
      screens: {
        xs: "425px",
        xxl: "1440px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities, addVariant }) {
      addVariant("not-last", "&:not(:last-child)");
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
} satisfies Config;

export default config;
