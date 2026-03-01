import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import Text from "./Text";

interface IconButtonProps {
  icon: string;
  onPress: () => void;
}

export const IconButton: FC<IconButtonProps> = ({ icon, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text variant="heading" color="primary">
      {icon}
    </Text>
  </TouchableOpacity>
);
