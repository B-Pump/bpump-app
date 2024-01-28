import { router } from "expo-router";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

import useFetch from "../../../context/api";

import { COLORS, images } from "../../../constants";
import styles from "../../common/cards/style/exoscard.style";

export function ExosCard({ exo }) {
    const { data, isLoading, error } = useFetch("GET", "exos", exo, {});

    return (
        <TouchableOpacity style={styles.container} onPress={() => router.push(`/exos/${exo}`)}>
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.light.text} />
            ) : error ? (
                <Text>Erreur lors du chargement de l'exercice</Text>
            ) : (
                <>
                    <View style={styles.logoContainer}>
                        <Image source={images.logo} resizeMode="contain" style={styles.logoImage} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.exoName} numberOfLines={1}>
                            {data[exo]?.sugar.title}
                        </Text>
                        <Text style={styles.exoType} numberOfLines={1}>
                            {data[exo]?.sugar.category} - Niveau {data[exo]?.sugar.difficulty}
                        </Text>
                    </View>
                </>
            )}
        </TouchableOpacity>
    );
}
