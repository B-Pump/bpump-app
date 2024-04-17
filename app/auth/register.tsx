import { Image } from "expo-image";
import { router } from "expo-router";
import { setItemAsync } from "expo-secure-store";
import { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/context/auth";
import { DEFAULT_THEME, THEME_KEY } from "@/lib/color";

export default function Register() {
    const { register, login } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);

    const [username, setUsername] = useState<string>(null);
    const [password, setPassword] = useState<string>(null);

    const onRegister = async () => {
        if (!username || !password) {
            return Alert.alert("Erreur", "Veuillez remplir tous les champs");
        }

        const usernameRegex = /^[a-zA-Z0-9_\-]+$/;
        const passwordRegex = /^[a-zA-Z0-9@#$%^&*]+$/;

        if (!usernameRegex.test(username.trim()) && !passwordRegex.test(password.trim())) {
            return Alert.alert(
                "Erreur",
                "Le nom d'utilisateur ou le mot de passe contient des caractères non autorisés",
            );
        }

        setLoading(true);

        const registerResult = await register!(username, password);
        if (registerResult && registerResult.error) {
            setLoading(false);
            return Alert.alert("Erreur", "Erreur lors de la création du compte");
        }

        const loginResult = await login!(username, password);
        if (loginResult && loginResult.error) {
            Alert.alert("Erreur", "Erreur lors de la connexion à votre compte");
        } else {
            setItemAsync(THEME_KEY, DEFAULT_THEME);
            router.replace("/");
        }

        setLoading(false);
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-3">
            <View>
                <View className="mb-5 items-center">
                    <Text className="text-3xl font-bold">Oh ! Un nouveau sportif ?</Text>
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
                <Image source="https://i.ibb.co/GVMtQbx/1.png" style={{ width: "100%", height: 500 }} />
            </View>
            <View className="py-3">
                <Button onPress={onRegister} disabled={loading}>
                    <Text className="text-accent">Créer un compte</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}
