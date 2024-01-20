import { useEffect, useState } from "react"
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    View,
} from "react-native"
import { Stack, useRouter, useGlobalSearchParams } from "expo-router"
import { Text, SafeAreaView } from "react-native"
import axios from "axios"

import { useTheme } from "../../utils/themeProvider"

import { ExosCard } from "../../components"
import { COLORS, icons, SIZES } from "../../constants"
import styles from "../../styles/search"

/**
 * Component to handle the search functionality and displaying the search results
 * @returns {React.Component} The rendered component for searching and displaying search results
 */
const ExoSearch = () => {
    const params = useGlobalSearchParams()
    const router = useRouter()

    const [searchResult, setSearchResult] = useState([])
    const [searchLoader, setSearchLoader] = useState(false)
    const [searchError, setSearchError] = useState(null)
    const [page, setPage] = useState(1)

    const handleSearch = async () => {
        setSearchLoader(true)
        setSearchResult([])

        try {
            const options = {
                // requête api avec la recherche
            }

            const response = await axios.request(options)
            setSearchResult(response.data.data)
        } catch (error) {
            setSearchError(error)
            console.log(error)
        } finally {
            setSearchLoader(false)
        }
    }

    const handlePagination = (direction) => {
        if (direction === "left" && page > 1) {
            setPage(page - 1)
            handleSearch()
        } else if (direction === "right") {
            setPage(page + 1)
            handleSearch()
        }
    }

    useEffect(() => {
        handleSearch()
    }, [])

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: useTheme().colors.background }}
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
            <FlatList
                data={searchResult}
                renderItem={({ item }) => (
                    <ExosCard
                        exo={item}
                        handleNavigate={() =>
                            router.push(`/exo-details/${item.exo_id}`)
                        }
                    />
                )}
                keyExtractor={(item) => item.exo_id}
                contentContainerStyle={{
                    padding: SIZES.medium,
                    rowGap: SIZES.medium,
                }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.id}</Text>
                            <Text style={styles.noOfSearchedExos}>
                                Voici ce que nous avons trouvé pour vous :
                            </Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator
                                    size="large"
                                    color={COLORS.primary}
                                />
                            ) : (
                                searchError && (
                                    <Text>
                                        Erreur lors du chargement du contenu de
                                        votre recherche
                                    </Text>
                                )
                            )}
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <Pressable
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1 },
                                styles.paginationButton,
                            ]}
                            onPress={() => handlePagination("left")}
                        >
                            <Image
                                source={icons.chevronLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </Pressable>
                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{page}</Text>
                        </View>
                        <Pressable
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1 },
                                styles.paginationButton,
                            ]}
                            onPress={() => handlePagination("right")}
                        >
                            <Image
                                source={icons.chevronRight}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </Pressable>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default ExoSearch
