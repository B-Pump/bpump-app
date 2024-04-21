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
 * Authentification register page where you can create a new account
 * @author wiizz
 * @returns {React.JSX.Element}
 */
export default function Register(): React.JSX.Element {
    const { register, login } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);

    const [username, setUsername] = useState<string>(null);
    const [password, setPassword] = useState<string>(null);

    const onRegister = async () => {
        if (!username || !password) {
            return Alert.alert("Erreur", "Veuillez remplir tous les champs");
        }

        if (username.includes(" ") || password.includes(" ")) {
            return Alert.alert(
                "Erreur",
                "Votre nom d'utilisateur ou votre mot de passe contient un ou plusieurs espaces",
            );
        }

        if (username.length > 8) {
            return Alert.alert("Erreur", "Votre nom d'utilisateur doit faire moins de 8 caractères");
        }

        if (password.length < 5) {
            return Alert.alert("Erreur", "Votre mote de passe doit faire au moins 5 caractères");
        }

        const hasNumber = /\d/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasNumber || !hasUpperCase || !hasLowerCase || !hasSpecialChar) {
            return Alert.alert(
                "Erreur",
                "Votre mot de passe doit contenir au moins un chiffre, une majuscule, une minuscule et un caractère spécial",
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
            return Alert.alert("Erreur", "Erreur lors de la connexion à votre compte");
        }

        setItemAsync(THEME_KEY, DEFAULT_THEME);
        router.replace("/");

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
