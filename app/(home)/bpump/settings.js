import { SafeAreaView, ScrollView, Text, View } from "react-native";

import { Compte, Infos, Notif, Robot, Theme } from "../../../components";

import { COLORS, SIZES } from "../../../constants";
import styles from "../../../style/settings.style";

export default function Settings() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light.background, paddingHorizontal: SIZES.medium }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.title}>Paramètres généraux</Text>
                    <Text style={styles.desc}>Configurez dès maintenant pour utiliser votre B-Pump !</Text>
                </View>
                <Robot />
                <Theme />
                <Notif />
                <Infos />
                <Compte />
            </ScrollView>
        </SafeAreaView>
    );
}
