import { SafeAreaView, View, Text, Button } from "react-native";

import { useAuth } from "../../context/auth";
import { COLORS } from "../../constants";

export default function Login() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light.background }}>
            <Text>Page pour se login letsgo !</Text>
            <Button title="Vous connecter" onPress={useAuth().signIn} />
        </SafeAreaView>
    );
}
