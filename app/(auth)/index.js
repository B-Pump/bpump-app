import { router } from "expo-router";
import { Button, SafeAreaView, Text, View } from "react-native";

import { COLORS, SIZES } from "../../constants";

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
