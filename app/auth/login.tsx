import { Image } from "expo-image";
import { router } from "expo-router";
import { setItemAsync } from "expo-secure-store";
import { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/context/auth";
import { DEFAULT_THEME, THEME_KEY } from "@/lib/color";

/**
 * Authentification login page where you can log into your account
 * @author wiizz
 * @returns {React.JSX.Element}
 */
export default function Login(): React.JSX.Element {
    const { login } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);

    const [username, setUsername] = useState<string>(null);
    const [password, setPassword] = useState<string>(null);

    const onLogin = async () => {
        if (!username || !password) {
            return Alert.alert("Erreur", "Veuillez remplir tous les champs");
        }

        setLoading(true);

        const loginResult = await login!(username, password);
        if (loginResult && loginResult.error) {
            setLoading(false);
            return Alert.alert("Erreur", "Identifiants invalides");
        }

        setItemAsync(THEME_KEY, DEFAULT_THEME);
        router.replace("/");

        setLoading(false);
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
            <View className="flex-1 items-center">
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
