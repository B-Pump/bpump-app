import { router } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <SafeAreaView className="flex-1 bg-white py-5">
            <View className="flex-1 items-center justify-center">
                <Text className="text-3xl font-semibold">Appli B-Pump</Text>
            </View>
            <View className="flex-1 items-center justify-end">
                <Button onPress={() => router.push("/auth/login/")}>
                    <Text className="text-accent">Démarrer votre aventure sportive</Text>
                </Button>
                <Button variant="ghost" onPress={() => router.push("/auth/register/")}>
                    <Text className="text-muted-foreground underline">Vous n'avez pas de compte ?</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}
