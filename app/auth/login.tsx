import { Image } from "expo-image";
import { router } from "expo-router";
import { setItemAsync } from "expo-secure-store";
import { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/context/auth";
import { DEFAULT_THEME, THEME_KEY } from "@/lib/color";

export default function Login() {
    const { login } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);

    const [username, setUsername] = useState<string>(null);
    const [password, setPassword] = useState<string>(null);

    const onLogin = async () => {
        if (username && password) {
            setLoading(true);

            const result = await login!(username, password);
            if (result && result.error) {
                Alert.alert("Erreur", "Identifiants invalides");
            } else {
                setItemAsync(THEME_KEY, DEFAULT_THEME);
                router.replace("/");
            }

            setLoading(false);
        } else Alert.alert("Erreur", "Veuillez remplir tous les champs");
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-3">
            <View>
                <View className="mb-5 items-center">
                    <Text className="text-3xl font-bold">Cela faisait longtemps !</Text>
                </View>
                <View className="py-5">
                    <View className="mb-5 gap-3">
                        <Input
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                            placeholder="Identifiant"
                            autoComplete="username"
                        />
                        <Input
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder="Mot de passe"
                            secureTextEntry
                            autoComplete="password"
                        />
                    </View>
                </View>
            </View>
            <View className="flex-1">
                <Image source="https://i.ibb.co/JQqkK4k/3.png" style={{ width: "100%", height: 500 }} />
            </View>
            <View className="py-3">
                <Button onPress={onLogin} disabled={loading}>
                    <Text className="text-accent">Vous connecter</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}
