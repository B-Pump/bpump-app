import { Theme, ThemeProvider } from "@react-navigation/native";
import { Redirect, Stack, router } from "expo-router";
import { ArrowLeft, Info, Settings, Share2 } from "lucide-react-native";
import { Share, Text } from "react-native";

import { useColorScheme } from "@/lib/color";
import { globals } from "@/styles/globals";

import { Button } from "@/components/ui/button";

import { useSession } from "@/context/auth";

export default function AppLayout() {
    const { isDarkColorScheme } = useColorScheme();
    const { session, isLoading } = useSession();

    if (isLoading) return <Text className="text-foreground">Chargement...</Text>;
    if (!session) return <Redirect href="/auth/" />;

    const lightTheme: Theme = {
        dark: false,
        colors: globals.light,
    };

    const darkTheme: Theme = {
        dark: true,
        colors: globals.dark,
    };

    return (
        <ThemeProvider value={isDarkColorScheme ? darkTheme : lightTheme}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        headerLeft: () => (
                            <Button variant="secondary" size="icon_sm" onPress={() => router.push("/about")}>
                                <Info color={isDarkColorScheme ? "white" : "black"} />
                            </Button>
                        ),
                        headerRight: () => (
                            <Button variant="secondary" size="icon_sm" onPress={() => router.push("/settings")}>
                                <Settings color={isDarkColorScheme ? "white" : "black"} />
                            </Button>
                        ),
                        headerShadowVisible: false,
                        title: "",
                    }}
                />
                <Stack.Screen
                    name="about"
                    options={{
                        animation: "fade_from_bottom",
                        headerLeft: () => (
                            <Button variant="secondary" size="icon_sm" onPress={() => router.back()}>
                                <ArrowLeft color={isDarkColorScheme ? "white" : "black"} />
                            </Button>
                        ),
                        headerRight: () => (
                            <Button
                                variant="secondary"
                                size="icon_sm"
                                onPress={() => {
                                    Share.share({
                                        message:
                                            "Je me suis mit au sport grâce à B-Pump, le coach sportif 100% robotique ! Tu devrais essayer : <lien_vers_le_site_web>",
                                    });
                                }}
                            >
                                <Share2 color={isDarkColorScheme ? "white" : "black"} />
                            </Button>
                        ),
                        headerShadowVisible: false,
                        title: "",
                    }}
                />
                <Stack.Screen
                    name="settings/index"
                    options={{
                        animation: "fade_from_bottom",
                        headerLeft: () => (
                            <Button variant="secondary" size="icon_sm" onPress={() => router.back()}>
                                <ArrowLeft color={isDarkColorScheme ? "white" : "black"} />
                            </Button>
                        ),
                        headerShadowVisible: false,
                        title: "",
                    }}
                />
                <Stack.Screen
                    name="settings/scan"
                    options={{
                        animation: "fade_from_bottom",
                        headerTransparent: true,
                        headerLeft: () => (
                            <Button variant="secondary" size="icon_sm" onPress={() => router.back()}>
                                <ArrowLeft color={isDarkColorScheme ? "white" : "black"} />
                            </Button>
                        ),
                        headerShadowVisible: false,
                        title: "",
                    }}
                />
                <Stack.Screen
                    name="exos/[id]"
                    options={{
                        animation: "fade_from_bottom",
                        headerLeft: () => (
                            <Button variant="secondary" size="icon_sm" onPress={() => router.back()}>
                                <ArrowLeft color={isDarkColorScheme ? "white" : "black"} />
                            </Button>
                        ),
                        headerShadowVisible: false,
                        title: "",
                    }}
                />
                <Stack.Screen
                    name="exos/showall"
                    options={{
                        animation: "fade_from_bottom",
                        headerLeft: () => (
                            <Button variant="secondary" size="icon_sm" onPress={() => router.back()}>
                                <ArrowLeft color={isDarkColorScheme ? "white" : "black"} />
                            </Button>
                        ),
                        headerShadowVisible: false,
                        title: "",
                    }}
                />
            </Stack>
        </ThemeProvider>
    );
}
