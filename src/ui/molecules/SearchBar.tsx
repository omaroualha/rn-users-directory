import React from "react";
import { TouchableOpacity } from "react-native";
import { Input } from "@/ui/atoms/Input";
import Text from "@/ui/atoms/Text";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
}) => {
  const clearButton = value.length > 0 ? (
    <TouchableOpacity
      onPress={onClear}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text variant="label">✕</Text>
    </TouchableOpacity>
  ) : undefined;

  return (
    <Input
      value={value}
      onChangeText={onChangeText}
      placeholder="Search users..."
      right={clearButton}
    />
  );
};
