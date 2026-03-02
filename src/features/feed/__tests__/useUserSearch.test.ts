import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useUserSearch } from "../hooks/useUsers";
import { apiHub } from "@/api/ApiHub";
import { mockUsersResponse } from "@/__fixtures__/users";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, gcTime: 0 } },
});

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(QueryClientProvider, { client: queryClient }, children);

describe("useUserSearch", () => {
  afterEach(() => {
    queryClient.clear();
    jest.restoreAllMocks();
  });

  it("does not fetch when query is empty", () => {
    const spy = jest.spyOn(apiHub.users, "searchUsers");

    renderHook(() => useUserSearch(""), { wrapper: wrapper });

    expect(spy).not.toHaveBeenCalled();
  });

  it("does not fetch when query is only whitespace", () => {
    const spy = jest.spyOn(apiHub.users, "searchUsers");

    renderHook(() => useUserSearch("   "), { wrapper: wrapper });

    expect(spy).not.toHaveBeenCalled();
  });

  it("fetches and returns mapped users when query is non-empty", async () => {
    jest
      .spyOn(apiHub.users, "searchUsers")
      .mockResolvedValue(mockUsersResponse);

    const { result } = renderHook(() => useUserSearch("emily"), {
      wrapper: wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([
      {
        id: 1,
        firstName: "Emily",
        lastName: "Johnson",
        image: "https://dummyjson.com/icon/emilys/128",
        email: "emily.johnson@x.dummyjson.com",
        company: {
          name: "Dooley, Kozey and Cronin",
          department: "Engineering",
          title: "Sales Manager",
        },
      },
    ]);
  });

  it("exposes isError when the request fails", async () => {
    jest
      .spyOn(apiHub.users, "searchUsers")
      .mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useUserSearch("emily"), {
      wrapper: wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
