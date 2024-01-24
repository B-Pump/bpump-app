import { SafeAreaView, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import { COLORS, SIZES, icons } from "../../../constants";
import styles from "../../../style/search";

export default function Search() {
    const { id } = useLocalSearchParams();

    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [page, setPage] = useState(1);

    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([]);

        try {
            setSearchResult("");
        } catch (error) {
            setSearchError(error);
            console.error(error);
        } finally {
            setSearchLoader(false);
        }
    };

    const handlePagination = (direction) => {
        if (direction === "left" && page > 1) {
            setPage(page - 1);
        } else if (direction === "right") {
            setPage(page + 1);
        }
        handleSearch();
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light.background }}>
            <FlatList
                data={searchResult}
                renderItem={({ item }) => {
                    // Exos card
                }}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    padding: SIZES.medium,
                    rowGap: SIZES.medium,
                }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{id}</Text>
                            <Text style={styles.noOfSearchedExos}>Voici ce que nous avons trouvé pour vous :</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator size="large" color={COLORS.primary} />
                            ) : (
                                searchError && <Text>Erreur lors du chargement du contenu de votre recherche</Text>
                            )}
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <TouchableOpacity style={styles.paginationButton} onPress={() => handlePagination("left")}>
                            <Image style={styles.paginationImage} source={icons.left} resizeMode="contain" />
                        </TouchableOpacity>
                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{page}</Text>
                        </View>
                        <TouchableOpacity style={styles.paginationButton} onPress={() => handlePagination("right")}>
                            <Image style={styles.paginationImage} source={icons.right} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
