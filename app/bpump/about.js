import { Text, View, SafeAreaView, ScrollView, Share } from "react-native"
import { Stack } from "expo-router"

import { useTheme } from "../../utils/themeProvider"

import { ScreenHeaderBtn } from "../../components"
import { SIZES, icons } from "../../constants"
import styles from "../../styles/bpump"

/**
 *  Composant Component representing the application's "About" screen
 * @returns {React.ReactNode} - Composant de l'écran "A propos".
 */
const BpumpAbout = () => {
    /**
     * Function called when you want to share the app
     * Uses React Native's Share API to share a message
     */
    const onShare = () => {
        Share.share({
            message:
                "Je me suis mit au sport grâce à B-Pump, le coach sportif 100% robotique ! Tu devrais essayer : <lien_vers_le_site_web>",
        })
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: useTheme().colors.background,
            }}
        >
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: useTheme().colors.background,
                    },
                    headerShadowVisible: false,
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                            handlePress={onShare}
                        />
                    ),
                    headerTitle: "À propos de nous",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Text>Le Projet B-Pump est ...</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BpumpAbout
