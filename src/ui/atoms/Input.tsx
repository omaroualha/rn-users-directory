import React from "react";
import { TextInput, StyleSheet } from "react-native";
import Box from "./Box";
import Text from "./Text";
import theme from "@/theme";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  right?: React.ReactNode;
  testID?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  error,
  right,
  testID,
}) => {
  return (
    <Box>
      <Box style={styles.container} borderColor={error ? "error" : "border"}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          testID={testID}
        />
        {right}
      </Box>
      {error && (
        <Text variant="caption" color="error" marginTop="xs">
          {error}
        </Text>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.cardBackground,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
  },
});
