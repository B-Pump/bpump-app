import "@/styles/globals.css";

import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold, useFonts } from "@expo-google-fonts/dm-sans";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider } from "@/context/auth";
import { useColorScheme } from "@/lib/color";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { isDarkColorScheme } = useColorScheme();

    const [fontsLoaded, fontError] = useFonts({
        DMSans_700Bold,
        DMSans_500Medium,
        DMSans_400Regular,
    });

    useEffect(() => {
        if (fontsLoaded || fontError) SplashScreen.hideAsync();
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) return null;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <AuthProvider>
                    <Slot />
                    <StatusBar style={isDarkColorScheme ? "dark" : "light"} />
                </AuthProvider>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
