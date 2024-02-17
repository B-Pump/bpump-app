import { router } from "expo-router";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";

import useFetch from "../../context/api";
import ProgsCard from "../common/cards/ProgsCard";

import { COLORS, SIZES } from "../../constants";
import styles from "./style/progs.style";

export default function Progs() {
    // TODO: dynamic username for api
    const { data, isLoading, error } = useFetch("GET", "progs/all?username=pierre");

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Programmes recommandés</Text>
                <TouchableOpacity onPress={() => router.push("progs/create")}>
                    <Text style={styles.headerBtn}>Créer</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.light.text} />
                ) : error ? (
                    <Text>{error}</Text>
                ) : (
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        renderItem={({ item, index }) => (
                            <ProgsCard data={item} load={isLoading} error={error} key={index} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ columnGap: SIZES.medium }}
                        horizontal
                    />
                )}
            </View>
        </View>
    );
}
