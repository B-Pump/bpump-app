import { useState } from "react"
import { View, ScrollView, SafeAreaView } from "react-native"
import { Stack, useRouter } from "expo-router"

import { useTheme } from "../utils/themeProvider"

import { icons, images, SIZES } from "../constants"
import { Exos, Prog, ScreenHeaderBtn, Welcome } from "../components"

/**
 * Component representing the application home page
 * @returns {React.Component} - Home page component
 */
const Home = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")

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
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={images.logo}
                            dimension="100%"
                            handlePress={() => router.push("/bpump/about")}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.settings}
                            dimension="70%"
                            handlePress={() => router.push("/bpump/settings")}
                        />
                    ),
                    headerTitle: "",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if (searchTerm) {
                                router.push(`/search/${searchTerm}`)
                            }
                        }}
                    />
                    <Prog />
                    <Exos />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home
