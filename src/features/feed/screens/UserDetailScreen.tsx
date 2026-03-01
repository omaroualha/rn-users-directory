import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { RootStackScreenProps } from "@/navigation/RootNavigator";

type UserDetailScreenProps = RootStackScreenProps<"UserDetail">;

export const UserDetailScreen: FC<UserDetailScreenProps> = ({ route }) => {
  const { userId } = route.params;

  return (
    <View style={styles.container}>
      <Text>User Detail — {userId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
