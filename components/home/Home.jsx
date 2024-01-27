import { router } from "expo-router";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import { SIZES, icons } from "../../constants";
import styles from "./style/home.style";

export default function Home({ searchTerm, setSearchTerm, handleClick }) {
    return (
        <View>
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
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={["Haut du corps", "Bas du corps", "Cardio", "Flexibilité", "Calisthénie", "Core"]}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.tab} onPress={() => router.push(`/search/${item}`)}>
                            <Text style={styles.tabText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    contentContainerStyle={{ columnGap: SIZES.small }}
                    horizontal
                />
            </View>
        </View>
    );
}
