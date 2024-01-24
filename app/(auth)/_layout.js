import { Stack, router } from "expo-router";

import { ScreenHeaderBtn } from "../../components";

import { COLORS, icons } from "../../constants";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="login"
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.light.background,
                    },
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.back} dimension="65%" handlePress={() => router.back()} />
                    ),
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.light.background,
                    },
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.back} dimension="65%" handlePress={() => router.back()} />
                    ),
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
        </Stack>
    );
}
