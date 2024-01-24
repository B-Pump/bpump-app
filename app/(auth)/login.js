import { SafeAreaView, View, Text, Button } from "react-native";

import { useAuth } from "../../context/auth";

import { COLORS, SIZES } from "../../constants";
import styles from "../../style/auth";

export default function Login() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light.background, padding: SIZES.medium }}>
            <Text>Login screen - En attente du design</Text>
            <Button title="Accèder à l'App" onPress={useAuth().signIn} color={COLORS.gray} />
        </SafeAreaView>
    );
}
