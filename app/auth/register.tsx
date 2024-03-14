import { router } from "expo-router";
import { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/context/auth";
import { useColorScheme } from "@/lib/color";

export default function Register() {
    const { onRegister, onLogin } = useAuth();
    const { setColorScheme } = useColorScheme();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        const result = await onLogin!(username, password);
        if (result && result.error) {
            Alert.alert("Authentification", "Identifiants invalides");
        } else router.replace("/");
    };

    const register = async () => {
        const result = await onRegister!(username, password);
        if (result && result.error) {
            Alert.alert("Authentification", result.msg);
        } else {
            login();
        }
    };
    return (
        <SafeAreaView className="flex-1 bg-background py-5">
            <View className="flex-1 justify-center">
                <View className="px-8">
                    <View className="mb-5 items-center">
                        <Text className="text-3xl font-semibold">Register form</Text>
                    </View>
                    <View>
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
                        <View>
                            <Button variant="secondary" onPress={register}>
                                <Text className="text-foreground">Créer un compte</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
