import React, { FC, useCallback } from "react";
import { ScreenWrapper } from "@/ui/molecules/ScreenWrapper";
import { LoadingView } from "@/ui/molecules/LoadingView";
import { ErrorView } from "@/ui/molecules/ErrorView";
import { FeedStackScreenProps } from "../navigation/FeedStack";
import { useUserList } from "../hooks/useUsers";
import { UserList } from "../components/UserList";

type FeedHomeProps = FeedStackScreenProps<"FeedHome">;

export const FeedHome: FC<FeedHomeProps> = ({ navigation }) => {
  const { users, isLoading, isError, isRefreshing, canLoadMore, onLoadMore, onRefresh } = useUserList();

  const handleUserPress = useCallback(
    (userId: number) => navigation.navigate("UserDetail", { userId }),
    [navigation],
  );

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView onRetry={onRefresh} />;

  return (
    <ScreenWrapper>
      <UserList
        users={users}
        isRefreshing={isRefreshing}
        canLoadMore={canLoadMore}
        onUserPress={handleUserPress}
        onLoadMore={onLoadMore}
        onRefresh={onRefresh}
      />
    </ScreenWrapper>
  );
};
