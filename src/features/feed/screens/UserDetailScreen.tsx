import React, { FC } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import Box from "@/ui/atoms/Box";
import Text from "@/ui/atoms/Text";
import { Avatar } from "@/ui/atoms/Avatar";
import { Divider } from "@/ui/atoms/Divider";
import { ScreenWrapper } from "@/ui/molecules/ScreenWrapper";
import { LoadingView } from "@/ui/molecules/LoadingView";
import { ErrorView } from "@/ui/molecules/ErrorView";
import { InfoRow } from "@/ui/molecules/InfoRow";
import { RootStackScreenProps } from "@/navigation/RootNavigator";
import { useUserById } from "../hooks/useUsers";

type UserDetailScreenProps = RootStackScreenProps<"UserDetail">;

export const UserDetailScreen: FC<UserDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { userId } = route.params;
  const { data: user, isLoading, isError, refetch } = useUserById(userId);

  if (isLoading) return <LoadingView />;
  if (isError || !user) return <ErrorView onRetry={refetch} />;

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <ScreenWrapper>
      <Box padding="m" alignItems="flex-end">
        <TouchableOpacity
          testID="detail-close"
          onPress={() => navigation.goBack()}
        >
          <Text variant="heading" color="primary">
            x
          </Text>
        </TouchableOpacity>
      </Box>
      <ScrollView>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <Box alignItems="center" padding="xl" gap="m">
            <Avatar uri={user.image} initials={initials} size="lg" />
            <Text
              testID="detail-name"
              variant="heading"
            >{`${user.firstName} ${user.lastName}`}</Text>
            <Text variant="caption">{user.company.title}</Text>
            <Text
              variant="caption"
              color="textMuted"
            >{`@${user.username}`}</Text>
          </Box>
        </Animated.View>

        <Divider />

        {/* Contact */}
        <Animated.View entering={FadeInUp.duration(300).delay(100)}>
          <Box padding="l" gap="s">
            <Text variant="label">Contact</Text>
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="Phone" value={user.phone} />
          </Box>
        </Animated.View>

        <Divider />

        {/* Company */}
        <Animated.View
          testID="detail-company-section"
          entering={FadeInUp.duration(300).delay(200)}
        >
          <Box padding="l" gap="s">
            <Text variant="label">Company</Text>
            <InfoRow label="Name" value={user.company.name} />
            <InfoRow label="Department" value={user.company.department} />
            <InfoRow label="Title" value={user.company.title} />
          </Box>
        </Animated.View>

        <Divider />

        {/* Location */}
        <Animated.View entering={FadeInUp.duration(300).delay(300)}>
          <Box padding="l" gap="s">
            <Text variant="label">Location</Text>
            <InfoRow label="Address" value={user.address.address} />
            <InfoRow label="City" value={user.address.city} />
            <InfoRow label="State" value={user.address.state} />
            <InfoRow label="Country" value={user.address.country} />
          </Box>
        </Animated.View>

        <Divider />

        {/* Personal */}
        <Animated.View entering={FadeInUp.duration(300).delay(400)}>
          <Box padding="l" gap="s">
            <Text variant="label">Personal</Text>
            <InfoRow label="Age" value={String(user.age)} />
            <InfoRow label="Born" value={user.birthDate} />
            <InfoRow label="Role" value={user.role} />
          </Box>
        </Animated.View>
      </ScrollView>
    </ScreenWrapper>
  );
};
