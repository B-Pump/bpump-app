import { Text, View, SafeAreaView, ScrollView } from "react-native"
import { Stack } from "expo-router"

import { useTheme } from "../../utils/themeProvider"

import { SIZES } from "../../constants"

/**
 * Composant représentant l'écran des détails du programme
 * @returns {React.ReactNode} - Composant de l'écran des détails du programme
 */
const ProgDetails = () => {
    return (
        <>
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
                        headerTitle: "",
                    }}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, padding: SIZES.medium }}>
                        <Text>Ceci est le détail du programme</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default ProgDetails
