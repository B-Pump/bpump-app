import "@/styles/globals.css";

import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold, useFonts } from "@expo-google-fonts/dm-sans";
import NetInfo from "@react-native-community/netinfo";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Wifi } from "lucide-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

import { useColorScheme } from "@/lib/color";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { isDarkColorScheme } = useColorScheme();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [fontsLoaded, fontError] = useFonts({
        DMSans_700Bold,
        DMSans_500Medium,
        DMSans_400Regular,
    });

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => setIsConnected(state.isConnected));

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (fontsLoaded || fontError) SplashScreen.hideAsync();
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) return null;

    return (
        <>
            {isConnected ? (
                <Slot />
            ) : (
                <SafeAreaView className="flex-1 bg-white px-3">
                    <View className="flex-1 items-center justify-center">
                        <View className="flex-row gap-2.5">
                            <Wifi color="black" />
                            <Text className="mb-4 text-lg font-bold">Connexion au WiFi requise</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-sm text-muted-foreground">
                                Veuillez vous connecter à un réseau WiFi pour continuer...
                            </Text>
                            <Text className="text-sm text-muted-foreground">
                                Redémarrez l'application si vous êtes actuellement connecté.
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>
            )}
            <StatusBar style={isDarkColorScheme ? "dark" : "light"} />
        </>
    );
}
