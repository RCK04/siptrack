import type { Config } from "tailwindcss";
import { palette } from "./src/shared/theme/palette";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./styles/**/*.css"],
  theme: {
    extend: {
      colors: palette,
    },
  },
  plugins: [],
} satisfies Config;
