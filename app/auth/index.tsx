import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
    return (
        <View className="flex-1 justify-center items-center gap-5">
            <TouchableOpacity onPress={() => router.push("/auth/login")}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/auth/register")}>
                <Text>Register</Text>
            </TouchableOpacity>
        </View>
    );
}
