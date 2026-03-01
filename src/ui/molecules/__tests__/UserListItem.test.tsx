import React from "react";
import { fireEvent } from "@testing-library/react-native";
import { renderWithTheme } from "@/test-utils";
import { UserListItem } from "../UserListItem";
import { UserSummary } from "@/features/feed/types";

const mockUser: UserSummary = {
  id: 1,
  firstName: "Emily",
  lastName: "Johnson",
  image: "https://dummyjson.com/icon/emilys/128",
  email: "emily.johnson@x.dummyjson.com",
  company: { name: "Dooley, Kozey and Cronin", department: "Engineering", title: "Sales Manager" },
};

describe("UserListItem", () => {
  it("renders the user full name", () => {
    const { getByText } = renderWithTheme(
      <UserListItem user={mockUser} onPress={() => {}} />,
    );

    expect(getByText("Emily Johnson")).toBeTruthy();
  });

  it("renders the department", () => {
    const { getByText } = renderWithTheme(
      <UserListItem user={mockUser} onPress={() => {}} />,
    );

    expect(getByText("Engineering")).toBeTruthy();
  });

  it("calls onPress with the correct userId when tapped", () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <UserListItem user={mockUser} onPress={onPress} />,
    );

    fireEvent.press(getByText("Emily Johnson"));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith(1);
  });
});
