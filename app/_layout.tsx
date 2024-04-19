import "@/styles/globals.css";

import NetInfo from "@react-native-community/netinfo";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Wifi } from "lucide-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

import { useColorScheme } from "@/lib/color";

/**
 * Global root layout
 * @author wiizz
 * @returns {React.JSX.Element}
 */
export default function RootLayout(): React.JSX.Element {
    const { isDarkColorScheme } = useColorScheme();

    const [isConnected, setIsConnected] = useState<boolean>(false);
    useEffect(() => {
        // Listener for connection state changes, here used to change screen when user do not have internet on his device
        const unsubscribe = NetInfo.addEventListener((state) => setIsConnected(state.isConnected));

        // Cleanup function to remove the listener when the component unmounts
        return () => unsubscribe();
    }, []);

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
