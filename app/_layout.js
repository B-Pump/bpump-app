import { Stack } from "expo-router"
import { useCallback } from "react"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"

import { ThemeProvider } from "../utils/themeProvider"

SplashScreen.preventAutoHideAsync()

/**
 * Composant principal de l'application
 * @returns {React.ReactNode} - Composant de la mise en page
 */
const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
        DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    })

    /**
     * Callback appelée lorsque la mise en page de la racine est effectuée
     * Masque l'écran de démarrage lorsque les polices sont chargées
     */
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) return null

    return (
        <>
            <ThemeProvider>
                <Stack onLayout={onLayoutRootView} />
            </ThemeProvider>
        </>
    )
}

export default Layout
