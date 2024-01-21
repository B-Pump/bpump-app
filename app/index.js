import { useState, useEffect } from "react"
import { View, ScrollView, SafeAreaView, Pressable, Text } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Stack, useRouter } from "expo-router"

import { useTheme } from "../utils/themeProvider"
import { Login } from "../components"

import { icons, images, SIZES } from "../constants"
import { Exos, Prog, ScreenHeaderBtn, Welcome } from "../components"

/**
 * Component representing the application home page
 * @returns {React.Component} - Home page component
 */
const Home = () => {
    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState("")
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    useEffect(() => {
        const fetchUserLoggedIn = async () => {
            const storedUserLoggedIn = await AsyncStorage.getItem(
                "userLoggedIn",
            )
            setUserLoggedIn(
                storedUserLoggedIn ? JSON.parse(storedUserLoggedIn) : false,
            )
        }
        fetchUserLoggedIn()
    }, [])

    const updateUserLoggedIn = async (value) => {
        setUserLoggedIn(value)
        await AsyncStorage.setItem("userLoggedIn", JSON.stringify(value))
    }

    const clearUserData = async () => {
        await AsyncStorage.removeItem("userLoggedIn")
        setUserLoggedIn(false)
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
                    {userLoggedIn ? (
                        <>
                            <Pressable onPress={clearUserData}>
                                <Text>Se déconnecter</Text>
                            </Pressable>
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
                        </>
                    ) : (
                        <Login login={updateUserLoggedIn} />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home
