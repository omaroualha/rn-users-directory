import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import Box from "@/ui/atoms/Box";
import Text from "@/ui/atoms/Text";
import { Avatar } from "@/ui/atoms/Avatar";
import { UserSummary } from "@/features/feed/types";

interface UserListItemProps {
  user: UserSummary;
  onPress: (userId: number) => void;
}

export const UserListItem: React.FC<UserListItemProps> = memo(
  ({ user, onPress }) => {
    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

    return (
      <TouchableOpacity
        testID="user-item"
        onPress={() => onPress(user.id)}
        activeOpacity={0.7}
      >
        <Box flexDirection="row" alignItems="center" padding="l" gap="m">
          <Avatar uri={user.image} initials={initials} size="md" />
          <Box flex={1}>
            <Text variant="body">{`${user.firstName} ${user.lastName}`}</Text>
            <Text variant="caption">{user.company.department}</Text>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  },
);
