import { Stack } from "expo-router";

import { COLORS } from "../../constants";

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
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
        </Stack>
    );
}
