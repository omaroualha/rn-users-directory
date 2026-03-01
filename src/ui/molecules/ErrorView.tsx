import React from "react";
import Box from "../atoms/Box";
import Text from "../atoms/Text";

interface ErrorViewProps {
  onRetry: () => void;
}

export function ErrorView({ onRetry }: ErrorViewProps) {
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="screenBackground"
      padding="l"
    >
      <Text variant="body" color="error">
        Something went wrong.
      </Text>
      <Text variant="caption" onPress={onRetry} marginTop="s">
        Tap to retry
      </Text>
    </Box>
  );
}
