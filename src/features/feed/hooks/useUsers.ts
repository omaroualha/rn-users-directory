import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { apiHub } from "@/api/ApiHub";
import { PAGE_SIZE } from "@/constants/api";
import { toUserDetail, toUserSummary, UserSummary } from "../types";

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
    queryFn: ({ pageParam: skip }) =>
      apiHub.users.getUsers(PAGE_SIZE, skip).then((res) => ({
        users: res.users.map(toUserSummary),
        total: res.total,
        skip: res.skip,
        limit: res.limit,
      })),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
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

export function useUserSearch(query: string) {
  return useQuery({
    queryKey: ["users", "search", query],
    queryFn: () =>
      apiHub.users
        .searchUsers(query)
        .then((res) => res.users.map(toUserSummary)),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });
}

export function useUserById(id: number) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => apiHub.users.getUserById(id).then(toUserDetail),
    staleTime: 5 * 60 * 1000,
  });
}
