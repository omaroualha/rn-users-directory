import { createTheme } from "@shopify/restyle";

export const palette = {
  brand: "#F19D8A",
  brandDark: "#323232",
  white: "#FFFFFF",
  black: "#000000",
  lightGray: "#F9FAFB",
  midGray: "#E5E7EB",
  mutedGray: "#9CA3AF",
  darkGray: "#4B5563",
  nearBlack: "#111827",
  red: "#EF4444",
};

const theme = createTheme({
  colors: {
    // surfaces
    screenBackground: palette.white,
    cardBackground: palette.lightGray,
    // text
    textPrimary: palette.nearBlack,
    textSecondary: palette.darkGray,
    textMuted: palette.mutedGray,
    // ui
    border: palette.midGray,
    // brand
    primary: palette.brand,
    primaryDark: palette.brandDark,
    // status
    error: palette.red,
    // raw
    white: palette.white,
    black: palette.black,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 32,
  },
  borderRadii: {
    s: 4,
    m: 8,
    l: 12,
    xl: 16,
    full: 999,
  },
  textVariants: {
    heading: { fontSize: 24, fontWeight: "700", color: "textPrimary" },
    subheading: { fontSize: 18, fontWeight: "600", color: "textPrimary" },
    body: { fontSize: 15, fontWeight: "400", color: "textPrimary" },
    caption: { fontSize: 13, fontWeight: "400", color: "textSecondary" },
    label: { fontSize: 12, fontWeight: "500", color: "textMuted" },
    defaults: { fontSize: 15, fontWeight: "400", color: "textPrimary" },
  },
});

export type Theme = typeof theme;
export default theme;
