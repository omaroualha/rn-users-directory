import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { FeedStackScreenProps } from "../navigation/FeedStack";

type FeedHomeProps = FeedStackScreenProps<"FeedHome">;

export const FeedHome: FC<FeedHomeProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Users List</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
