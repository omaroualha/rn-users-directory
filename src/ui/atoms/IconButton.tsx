import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import Text from "./Text";

interface IconButtonProps {
  icon: string;
  onPress: () => void;
  testID?: string;
}

export const IconButton: FC<IconButtonProps> = ({ icon, onPress, testID }) => (
  <TouchableOpacity onPress={onPress} testID={testID}>
    <Text variant="heading" color="primary">
      {icon}
    </Text>
  </TouchableOpacity>
);
