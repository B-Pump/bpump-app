import { Stack } from "expo-router"
import { useCallback } from "react"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"

import { ThemeProvider } from "../utils/themeProvider"

SplashScreen.preventAutoHideAsync()

/**
 * Main component of the application
 * @returns {React.Component} - Layout Component
 */
const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
        DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    })

    /**
     * Callback called when root layout is done
     * Hide the splash screen when fonts are loaded
     */
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) return null

    return (
        <ThemeProvider>
            <Stack onLayout={onLayoutRootView} />
        </ThemeProvider>
    )
}

export default Layout
