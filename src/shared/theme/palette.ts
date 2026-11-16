const water = {
  50: "#f0f9ff",
  100: "#e0f2fe",
  200: "#bae6fd",
  300: "#7dd3fc",
  400: "#38bdf8",
  500: "#0ea5e9",
  600: "#0284c7",
  700: "#0369a1",
  800: "#075985",
  900: "#0c3d66",
} as const;

const teal = {
  50: "#f0fdfa",
  100: "#ccfbf1",
  200: "#99f6e4",
  300: "#5eead4",
  400: "#2dd4bf",
  500: "#14b8a6",
  600: "#0d9488",
  700: "#0f766e",
  800: "#134e4a",
  900: "#0d3b36",
} as const;

const mint = {
  50: "#f0fdf4",
  100: "#dcfce7",
  200: "#bbf7d0",
  300: "#86efac",
  400: "#4ade80",
  500: "#22c55e",
  600: "#16a34a",
  700: "#15803d",
  800: "#166534",
  900: "#145231",
} as const;

export const palette = {
  water,
  teal,
  mint,
  flow: {
    paper: "#effaf7",
    ink: teal[800],
    muted: "#4c716b",
    line: "#c9e0d8",
    surface: "#dceee7",
    track: "#d2e8e0",
    hover: "#e0f2e9",
    sky: "#c9f0ef",
    glass: "#f1fdf9",
    mist: "#e6fafa",
    soft: "#c1ded4",
    highlight: "#a9dbcb",
    chart: "#32857a",
  },
  feedback: {
    danger: "#ef4444",
    caution: "#facc15",
    warningForeground: "#713f12",
  },
} as const;
