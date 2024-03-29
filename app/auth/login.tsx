import { router } from "expo-router";
import { setItemAsync } from "expo-secure-store";
import { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/context/auth";
import { DEFAULT_THEME, THEME_KEY } from "@/lib/color";

export default function Login() {
    const { onLogin } = useAuth();

    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        if (username.trim() && password.trim()) {
            setLoading(true);

            const result = await onLogin!(username, password);
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
        <SafeAreaView className="flex-1 bg-background py-5">
            <View className="flex-1 justify-center">
                <View className="px-8">
                    <View className="mb-5 items-center">
                        <Text className="text-3xl font-semibold">Login form</Text>
                    </View>
                    <View>
                        <View className="mb-5 gap-3">
                            <Input
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                                placeholder="Identifiant"
                                autoComplete="username"
                                autoCapitalize="none"
                            />
                            <Input
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                placeholder="Mot de passe"
                                secureTextEntry
                                autoComplete="password"
                                autoCapitalize="none"
                            />
                        </View>
                        <View>
                            <Button variant="secondary" onPress={login} disabled={loading}>
                                <Text className="text-foreground">Vous connecter</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
