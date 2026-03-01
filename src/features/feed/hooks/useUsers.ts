import { useInfiniteQuery } from "@tanstack/react-query";
import { apiHub } from "@/api/ApiHub";
import { PAGE_SIZE } from "@/constants/api";
import { toUserSummary, UserSummary } from "../types";

export type UserListResult = {
  users: UserSummary[];
  isLoading: boolean;
  isError: boolean;
  isRefreshing: boolean;
  canLoadMore: boolean;
  onLoadMore: () => void;
  onRefresh: () => void;
};

export function useUserList(): UserListResult {
  const query = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam: page }) =>
      apiHub.users
        .getUsers(PAGE_SIZE, page * PAGE_SIZE)
        .then((res) => ({ users: res.users.map(toUserSummary), total: res.total })),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, currentPage) => {
      const fetched = (currentPage + 1) * PAGE_SIZE;
      return fetched < lastPage.total ? currentPage + 1 : undefined;
    },
  });

  return {
    users: query.data?.pages.flatMap((page) => page.users) ?? [],
    isLoading: !query.data && query.isLoading,
    isError: !query.data && query.isError,
    isRefreshing: query.isRefetching,
    canLoadMore: !!query.hasNextPage && !query.isFetchingNextPage,
    onLoadMore: query.fetchNextPage,
    onRefresh: query.refetch,
  };
}
