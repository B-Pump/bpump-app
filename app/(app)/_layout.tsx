import { globals } from "@/styles/globals";

import { Theme, ThemeProvider } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Redirect, Stack, router } from "expo-router";
import { ArrowLeft, Info, Settings, Share2 } from "lucide-react-native";
import { Share } from "react-native";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/context/auth";
import { SocketProvider } from "@/context/socket";
import { useColorScheme } from "@/lib/color";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AppLayout() {
    const { isDarkColorScheme } = useColorScheme();
    const { authenticated } = useAuth();

    if (!authenticated) return <Redirect href="/auth/" />;

    const lightTheme: Theme = {
        dark: false,
        colors: globals.light,
    };

    const darkTheme: Theme = {
        dark: true,
        colors: globals.dark,
    };

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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <ThemeProvider value={isDarkColorScheme ? darkTheme : lightTheme}>
                    <SocketProvider>
                        <Stack>
                            <Stack.Screen
                                name="index"
                                options={{
                                    headerLeft: () => (
                                        <Button
                                            variant="secondary"
                                            size="icon_sm"
                                            onPress={() => router.push("/about")}
                                        >
                                            <Info color={isDarkColorScheme ? "white" : "black"} />
                                        </Button>
                                    ),
                                    headerRight: () => (
                                        <Button
                                            variant="secondary"
                                            size="icon_sm"
                                            onPress={() => router.push("/settings")}
                                        >
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
                                    ...defaultStack,
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
                                }}
                            />
                            <Stack.Screen
                                name="settings/scan"
                                options={{
                                    ...defaultStack,
                                    headerTransparent: true,
                                }}
                            />
                            <Stack.Screen name="settings/index" options={defaultStack} />
                            <Stack.Screen name="exos/[id]" options={defaultStack} />
                            <Stack.Screen name="exos/showall" options={defaultStack} />
                            <Stack.Screen name="exos/result" options={defaultStack} />
                            <Stack.Screen name="progs/create" options={defaultStack} />
                            <Stack.Screen name="search/[id]" options={defaultStack} />
                        </Stack>
                    </SocketProvider>
                </ThemeProvider>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
