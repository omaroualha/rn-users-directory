import React, { FC } from "react";
import Box from "@/ui/atoms/Box";
import Text from "@/ui/atoms/Text";

interface InfoRowProps {
  label: string;
  value: string;
}

export const InfoRow: FC<InfoRowProps> = ({ label, value }) => (
  <Box flexDirection="row" justifyContent="space-between" gap="m">
    <Text variant="caption" color="textMuted">
      {label}
    </Text>
    <Text variant="caption" color="textSecondary">
      {value}
    </Text>
  </Box>
);
