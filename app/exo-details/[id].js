import { Text, View, SafeAreaView, ScrollView } from "react-native"
import { Stack } from "expo-router"

import { useTheme } from "../../utils/themeProvider"

import { SIZES } from "../../constants"

/**
 * Component representing the exercise details screen
 * @returns {React.Component} - Component of the exercise details screen
 */
const ExoDetails = () => {
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
                    headerTitle: "",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Text>Ceci est le détail de l'exercice</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ExoDetails
