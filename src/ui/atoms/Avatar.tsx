import { palette } from "@/theme";
import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  uri?: string;
  initials?: string;
  size?: AvatarSize;
}

const sizes: Record<AvatarSize, number> = { sm: 32, md: 44, lg: 64 };

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  initials,
  size = "md",
}) => {
  const dimension = sizes[size];
  const style = {
    width: dimension,
    height: dimension,
    borderRadius: dimension / 2,
  };

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.image, style]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View style={[styles.fallback, style]}>
      <Text style={styles.initials}>{initials ?? "?"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: palette.lightGray,
  },
  fallback: {
    backgroundColor: palette.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    fontSize: 12,
    fontWeight: "500",
    color: palette.mutedGray,
  },
});
