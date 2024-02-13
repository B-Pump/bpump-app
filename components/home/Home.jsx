import { router } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import useFetch from "../../context/api";

import { COLORS, SIZES, icons } from "../../constants";
import styles from "./style/home.style";

export default function Home({ searchTerm, setSearchTerm, handleClick }) {
    const { data, isLoading, error } = useFetch("GET", "exos/all", {});

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.homeTitle}>Bonjour, je suis B-Pump !</Text>
                <Text style={styles.homeDesc}>Trouvez votre programme d'entraînement parfait !</Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchTerm}
                        onChangeText={(text) => setSearchTerm(text)}
                        placeholder="Que recherchez vous ?"
                    />
                </View>
                <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
                    <Image style={styles.searchBtnImage} source={icons.search} resizeMode="contain" />
                </TouchableOpacity>
            </View>
            <View style={styles.tabsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.light.text} />
                ) : error ? (
                    <Text>Erreur lors du chargement des preset de recherche</Text>
                ) : (
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={[...new Set(data.map((item) => item.sugar.category))]}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.tab} onPress={() => router.push(`search/${item}`)}>
                                <Text style={styles.tabText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item}
                        contentContainerStyle={{ columnGap: SIZES.small }}
                        horizontal
                    />
                )}
            </View>
        </>
    );
}
