import { Stack, router } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import { Compte, Infos, Notif, Robot, ScreenHeaderBtn, Theme } from "../../../components";
import { useTheme } from "../../../context/theme";

import { SIZES, icons } from "../../../constants";
import styles from "../../../style/settings.style";

export default function Settings() {
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: useTheme().colors.background, paddingHorizontal: SIZES.medium }}
        >
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: useTheme().colors.background,
                    },
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.back} dimension="65%" handlePress={() => router.back()} />
                    ),
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
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
