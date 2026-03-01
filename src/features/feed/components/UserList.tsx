import React, { FC, useCallback } from "react";
import { FlatList } from "react-native";
import Box from "@/ui/atoms/Box";
import Text from "@/ui/atoms/Text";
import { UserListItem } from "@/ui/molecules/UserListItem";
import { UserSummary } from "../types";

interface UserListProps {
  users: UserSummary[];
  isRefreshing: boolean;
  canLoadMore: boolean;
  onUserPress: (userId: number) => void;
  onLoadMore: () => void;
  onRefresh: () => void;
}

export const UserList: FC<UserListProps> = ({
  users,
  isRefreshing,
  canLoadMore,
  onUserPress,
  onLoadMore,
  onRefresh,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: UserSummary }) => (
      <UserListItem user={item} onPress={onUserPress} />
    ),
    [onUserPress],
  );

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      onEndReached={canLoadMore ? onLoadMore : undefined}
      onEndReachedThreshold={0.4}
      ListEmptyComponent={
        <Box padding="xl" alignItems="center">
          <Text variant="body" color="textMuted">
            No users found.
          </Text>
        </Box>
      }
    />
  );
};
