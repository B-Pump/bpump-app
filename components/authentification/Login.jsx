import { View, Text, Pressable } from "react-native"

import { useTheme } from "../../utils/themeProvider"

import { SIZES } from "../../constants"
import styles from "./style/login.style"

export default function Login({ login }) {
    const handleLogin = () => {
        login(true)
    }
    return (
        <View style={{ backgroundColor: useTheme().colors.background }}>
            <Pressable onPress={handleLogin}>
                <Text>Se connecter</Text>
            </Pressable>
        </View>
    )
}
