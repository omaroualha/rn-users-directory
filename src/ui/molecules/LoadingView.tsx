import React from "react";
import { ActivityIndicator } from "react-native";
import Box from "../atoms/Box";

const BRAND_COLOR = "#F19D8A";

interface LoadingViewProps {
  size?: "small" | "large";
}

export function LoadingView({ size = "large" }: LoadingViewProps) {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" backgroundColor="screenBackground">
      <ActivityIndicator size={size} color={BRAND_COLOR} />
    </Box>
  );
}
