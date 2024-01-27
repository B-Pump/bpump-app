import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";

import ProgsCard from "../common/cards/ProgsCard";

import { COLORS, SIZES } from "../../constants";
import styles from "./style/progs.style";

export default function Progs() {
    let data = ["Programme 1", "Programme 2", "Programme 3", "Programme 4"];
    let isLoading = false;
    let error = false;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Programmes recommandés</Text>
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.headerBtn}>Afficher tout</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.light.text} />
                ) : error ? (
                    <Text>Erreur lors du chargement des programmes</Text>
                ) : (
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        renderItem={({ item, index }) => <ProgsCard prog={item} key={index} />}
                        keyExtractor={(item) => item}
                        contentContainerStyle={{ columnGap: SIZES.medium }}
                        horizontal
                    />
                )}
            </View>
        </View>
    );
}
