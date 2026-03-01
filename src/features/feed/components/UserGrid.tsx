import React, { FC, useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import Box from "@/ui/atoms/Box";
import Text from "@/ui/atoms/Text";
import { UserGridItem } from "@/ui/molecules/UserGridItem";
import { UserSummary } from "../types";

interface UserGridProps {
  users: UserSummary[];
  isRefreshing: boolean;
  canLoadMore: boolean;
  onUserPress: (userId: number) => void;
  onLoadMore: () => void;
  onRefresh: () => void;
}

const EmptyComponent = () => (
  <Box padding="xl" alignItems="center">
    <Text variant="body" color="textMuted">
      No users found.
    </Text>
  </Box>
);

export const UserGrid: FC<UserGridProps> = ({
  users,
  isRefreshing,
  canLoadMore,
  onUserPress,
  onLoadMore,
  onRefresh,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: UserSummary }) => (
      <UserGridItem user={item} onPress={onUserPress} />
    ),
    [onUserPress],
  );

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      numColumns={2}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      onEndReached={canLoadMore ? onLoadMore : undefined}
      onEndReachedThreshold={0.4}
      ListEmptyComponent={EmptyComponent}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  list: { flex: 1 },
  content: { padding: 4 },
});
