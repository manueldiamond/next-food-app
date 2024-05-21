import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container:{
        "padding":"1.5rem",
        center:true,
      },
      borderRadius:{
        "20":"20px"
      },
      colors:{
        "accent":"#EF2A39",
        "gray-1":"#3C2F2F",
        "gray-2":"#6A6A6A",
        "gray-3":"#808080",
      },
      fontFamily:{
        "lobster":"var(--lobster-font)"
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(171.57deg, #FF939B 0.66%, #EF2A39 64.7%)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
