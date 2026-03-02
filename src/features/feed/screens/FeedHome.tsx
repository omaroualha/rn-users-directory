import React, { FC, useCallback, useState } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Box from "@/ui/atoms/Box";
import { IconButton } from "@/ui/atoms/IconButton";
import { SearchBar } from "@/ui/molecules/SearchBar";
import { ScreenWrapper } from "@/ui/molecules/ScreenWrapper";
import { LoadingView } from "@/ui/molecules/LoadingView";
import { ErrorView } from "@/ui/molecules/ErrorView";
import { FeedStackScreenProps } from "../navigation/FeedStack";
import { useUserList, useUserSearch } from "../hooks/useUsers";
import { UserList } from "../components/UserList";
import { UserGrid } from "../components/UserGrid";
import { useDebounce } from "@/hooks/useDebounce";

type ViewMode = "list" | "grid";
type FeedHomeProps = FeedStackScreenProps<"FeedHome">;

export const FeedHome: FC<FeedHomeProps> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const debouncedSearch = useDebounce(search, 300);
  const isSearching = debouncedSearch.trim().length > 0;

  const list = useUserList();
  const searchResults = useUserSearch(debouncedSearch);

  const handleUserPress = useCallback(
    (userId: number) => navigation.navigate("UserDetail", { userId }),
    [navigation],
  );

  if (list.isLoading) return <LoadingView />;
  if (list.isError) return <ErrorView onRetry={list.onRefresh} />;

  const sharedProps = {
    users: isSearching ? (searchResults.data ?? []) : list.users,
    isRefreshing: isSearching ? false : list.isRefreshing,
    canLoadMore: isSearching ? false : list.canLoadMore,
    onUserPress: handleUserPress,
    onLoadMore: list.onLoadMore,
    onRefresh: list.onRefresh,
  };

  return (
    <ScreenWrapper>
      <Box flexDirection="row" alignItems="center" padding="m" gap="m">
        <Box flex={1}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            onClear={() => setSearch("")}
          />
        </Box>
        <IconButton
          testID="view-toggle"
          icon={viewMode === "list" ? "⊞" : "☰"}
          onPress={() =>
            setViewMode((prev) => (prev === "list" ? "grid" : "list"))
          }
        />
      </Box>
      {viewMode === "grid" ? (
        <Animated.View
          key="grid"
          style={{ flex: 1 }}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
        >
          <UserGrid {...sharedProps} />
        </Animated.View>
      ) : (
        <Animated.View
          key="list"
          style={{ flex: 1 }}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
        >
          <UserList {...sharedProps} />
        </Animated.View>
      )}
    </ScreenWrapper>
  );
};
