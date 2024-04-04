import { Image } from "expo-image";
import { router } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <SafeAreaView className="flex-1 bg-white px-3">
            <View className="flex-1 items-center justify-center">
                <View className="items-center">
                    <Text className="text-3xl font-bold">Bienvenue !</Text>
                    <Text className="text-2xl font-semibold">Prêt à vous entraîner ?</Text>
                </View>
            </View>
            <Image source="https://i.ibb.co/80c35G6/2.png" style={{ width: "100%", height: 500 }} />
            <View className="py-3">
                <Button onPress={() => router.push("/auth/register/")}>
                    <Text className="text-white">Démarrer votre aventure sportive</Text>
                </Button>
                <Button variant="ghost" onPress={() => router.push("/auth/login/")}>
                    <Text className="text-muted-foreground underline">Vous avez déjà un compte ?</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}
