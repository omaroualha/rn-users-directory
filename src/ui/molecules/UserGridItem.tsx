import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import Box from "@/ui/atoms/Box";
import Text from "@/ui/atoms/Text";
import { Avatar } from "@/ui/atoms/Avatar";
import { UserSummary } from "@/features/feed/types";

interface UserGridItemProps {
  user: UserSummary;
  onPress: (userId: number) => void;
}

export const UserGridItem: React.FC<UserGridItemProps> = memo(
  ({ user, onPress }) => {
    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

    return (
      <TouchableOpacity
        testID="user-item"
        onPress={() => onPress(user.id)}
        activeOpacity={0.7}
        style={{ flex: 1 }}
      >
        <Box
          flex={1}
          alignItems="center"
          padding="m"
          gap="s"
          margin="xs"
          backgroundColor="cardBackground"
          borderRadius="m"
        >
          <Avatar uri={user.image} initials={initials} size="lg" />
          <Text
            variant="body"
            numberOfLines={1}
          >{`${user.firstName} ${user.lastName}`}</Text>
          <Text variant="caption" numberOfLines={1}>
            {user.company.department}
          </Text>
        </Box>
      </TouchableOpacity>
    );
  },
);
