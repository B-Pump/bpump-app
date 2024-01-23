import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { COLORS } from "../../constants";

export default function Index() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light.background }}>
            <View>
                <Text>Commencez dès maintenant !</Text>
                <Text>
                    La perfection dans chaque mouvements.{"\n\n"}
                    Améliorez la justesse de vos postures grâce à B-Pump, votre coach sportif 100% Robotique !
                </Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => router.push("/register")}>
                    <Text>Démarrer votre aventure sportive</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/login")}>
                    <Text>Vous avez déjà un compte ?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
