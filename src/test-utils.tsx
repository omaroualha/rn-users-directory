import React from "react";
import { ThemeProvider } from "@shopify/restyle";
import { render, RenderOptions } from "@testing-library/react-native";
import theme from "@/theme";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const renderWithTheme = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react-native";
export { renderWithTheme };
