import { Stack } from "expo-router";

export default function AppLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="login"
                options={{
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
        </Stack>
    );
}
