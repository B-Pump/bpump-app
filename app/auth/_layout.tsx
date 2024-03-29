import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Redirect, Stack, router } from "expo-router";
import { getItemAsync } from "expo-secure-store";
import { ArrowLeft } from "lucide-react-native";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/context/auth";
import { DEFAULT_THEME, THEME_KEY, useColorScheme } from "@/lib/color";

export default function AppLayout() {
    const { isDarkColorScheme, setColorScheme } = useColorScheme();
    const { authState } = useAuth();

    async function setTheme() {
        type ThemeType = "dark" | "light" | "system";
        const themeString: string = await getItemAsync(THEME_KEY);

        if (themeString === "dark" || themeString === "light" || themeString === "system") {
            const theme: ThemeType = themeString;
            setColorScheme(theme);
        }
    }

    if (authState.authenticated) {
        setTheme();
        return <Redirect href="/" />;
    } else setColorScheme(DEFAULT_THEME);

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
