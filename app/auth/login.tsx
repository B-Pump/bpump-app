import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { useSession } from "@/context/auth";

export default function Login() {
    const { signIn } = useSession();

    return (
        <View className="flex-1 items-center justify-center">
            <TouchableOpacity
                onPress={() => {
                    signIn();
                    router.replace("/");
                }}
            >
                <Text>Vous connecter</Text>
            </TouchableOpacity>
        </View>
    );
}
