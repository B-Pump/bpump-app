import { SafeAreaView, View, Text, TouchableOpacity, Button } from "react-native";
import { router } from "expo-router";

import { COLORS, SIZES } from "../../constants";
import styles from "../../style/auth";

export default function Index() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light.background, padding: SIZES.xxLarge }}>
            <View>
                <Text>Welcome screen - En attente du design</Text>
            </View>
            <View>
                <Button title="Créer un compte" onPress={() => router.push("/register")} color={COLORS.gray2} />
                <Button title="Vous connecter" onPress={() => router.push("/login")} color={COLORS.gray} />
            </View>
        </SafeAreaView>
    );
}
