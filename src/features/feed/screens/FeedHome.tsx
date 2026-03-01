import React, { FC, useCallback, useState } from "react";
import Box from "@/ui/atoms/Box";
import { SearchBar } from "@/ui/molecules/SearchBar";
import { ScreenWrapper } from "@/ui/molecules/ScreenWrapper";
import { LoadingView } from "@/ui/molecules/LoadingView";
import { ErrorView } from "@/ui/molecules/ErrorView";
import { FeedStackScreenProps } from "../navigation/FeedStack";
import { useUserList, useUserSearch } from "../hooks/useUsers";
import { UserList } from "../components/UserList";
import { useDebounce } from "@/hooks/useDebounce";

type FeedHomeProps = FeedStackScreenProps<"FeedHome">;

export const FeedHome: FC<FeedHomeProps> = ({ navigation }) => {
  const [search, setSearch] = useState("");
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

  return (
    <ScreenWrapper>
      <Box padding="m">
        <SearchBar
          value={search}
          onChangeText={setSearch}
          onClear={() => setSearch("")}
        />
      </Box>
      <UserList
        users={isSearching ? (searchResults.data ?? []) : list.users}
        isRefreshing={
          isSearching ? searchResults.isFetching : list.isRefreshing
        }
        canLoadMore={isSearching ? false : list.canLoadMore}
        onUserPress={handleUserPress}
        onLoadMore={list.onLoadMore}
        onRefresh={list.onRefresh}
      />
    </ScreenWrapper>
  );
};
