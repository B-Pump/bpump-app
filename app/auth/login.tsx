import { router } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSession } from "@/context/auth";

export default function Login() {
    const { signIn } = useSession();

    return (
        <SafeAreaView className="flex-1 bg-white py-5">
            <View className="flex-1 justify-center">
                <View className="px-8">
                    <View className="mb-5">
                        <Input placeholder="Identifiant" autoComplete="username" />
                        <Input placeholder="Mot de passe" secureTextEntry autoComplete="password" />
                    </View>
                    <View>
                        <Button
                            variant="secondary"
                            onPress={() => {
                                signIn();
                                router.replace("/");
                            }}
                        >
                            <Text>Vous connecter</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
