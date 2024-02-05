import { router } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import useFetch from "../../context/api";
import { ExosCard } from "../common/cards/ExosCard";

import { COLORS } from "../../constants";
import styles from "./style/exos.style";

export default function Exos() {
    const { data, isLoading, error } = useFetch("GET", "fetch", "exos", {});

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Exercices recommandés</Text>
                <TouchableOpacity onPress={() => router.push("exos/showall")}>
                    <Text style={styles.headerBtn}>Afficher tout</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.light.text} />
                ) : error ? (
                    <Text>Erreur lors du chargement des exercices</Text>
                ) : (
                    data.slice(0, 4)?.map((item, index) => <ExosCard exo={item} key={index} />)
                )}
            </View>
        </View>
    );
}
