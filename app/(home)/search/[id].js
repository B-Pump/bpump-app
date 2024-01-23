import { SafeAreaView, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";

import { COLORS, SIZES, icons } from "../../../constants";
import styles from "../../../style/search";

export default function Search() {
    const { id } = useLocalSearchParams();

    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [page, setPage] = useState(1);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light.background, padding: SIZES.medium }}>
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
                        <View>
                            {searchLoader ? (
                                <ActivityIndicator size="large" color={COLORS.primary} />
                            ) : (
                                searchError && <Text>Erreur lors du chargement du contenu de votre recherche</Text>
                            )}
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View>
                        <TouchableOpacity onPress={() => {}}>
                            <Image source={icons.left} resizeMode="contain" />
                        </TouchableOpacity>
                        <View>
                            <Text>{page}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {}}>
                            <Image source={icons.right} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
