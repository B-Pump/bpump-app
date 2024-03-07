import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Stack, router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import { Button } from "@/components/ui/button";

import { useColorScheme } from "@/lib/color";

export default function AppLayout() {
    const { isDarkColorScheme } = useColorScheme();

    const defaultStack: NativeStackNavigationOptions = {
        animation: "fade_from_bottom",
        headerLeft: () => (
            <Button variant="secondary" size="icon_sm" onPress={() => router.back()}>
                <ArrowLeft color={isDarkColorScheme ? "white" : "black"} />
            </Button>
        ),
        headerShadowVisible: false,
        title: "",
    };

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={defaultStack} />
            <Stack.Screen name="register" options={defaultStack} />
        </Stack>
    );
}
