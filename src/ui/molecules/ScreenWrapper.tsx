import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Box from "../atoms/Box";

interface ScreenWrapperProps {
  children: React.ReactNode;
}

export function ScreenWrapper({ children }: ScreenWrapperProps) {
  const insets = useSafeAreaInsets();

  return (
    <Box
      flex={1}
      backgroundColor="screenBackground"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {children}
    </Box>
  );
}
