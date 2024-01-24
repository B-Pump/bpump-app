import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import { COLORS } from "../../constants";
import styles from "./style/exos.style";

export default function Exos() {
    let data = ["Programme 1", "Programme 2"];
    let isLoading = false;
    let error = true;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Exercices recommandés</Text>
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.headerBtn}>Afficher tout</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.light.text} />
                ) : error ? (
                    <Text>Erreur lors du chargement des exercices</Text>
                ) : (
                    data?.map((item) => console.log("exercice"))
                )}
            </View>
        </View>
    );
}
