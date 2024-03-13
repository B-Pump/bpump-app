import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSession } from "@/context/auth";
import { useColorScheme } from "@/lib/color";

export default function Login() {
    const { signIn } = useSession();
    const { setColorScheme } = useColorScheme();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <SafeAreaView className="flex-1 bg-background py-5">
            <View className="flex-1 justify-center">
                <View className="px-8">
                    <View className="mb-5">
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
                        <Button
                            variant="secondary"
                            onPress={() => {
                                setColorScheme("system");
                                signIn();
                                router.replace("/");
                            }}
                        >
                            <Text className="text-foreground">Vous connecter</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
