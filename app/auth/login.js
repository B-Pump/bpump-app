import { Text, View, SafeAreaView, ScrollView, Share } from "react-native"
import { Stack } from "expo-router"

import { useTheme } from "../../utils/themeProvider"

import { SIZES, icons } from "../../constants"
import styles from "../../styles/auth"

const AuthLogin = () => {
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
                    <Text>Login toi yooyoyo</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AuthLogin
