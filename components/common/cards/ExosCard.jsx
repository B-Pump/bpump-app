import { router } from "expo-router";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

import { COLORS, images } from "../../../constants";
import styles from "../../common/cards/style/exoscard.style";

export function ExosCard({ data, load, error }) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => router.push(`/exos/${data?.id}`)}>
            {load ? (
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
                            {data?.sugar.title}
                        </Text>
                        <Text style={styles.exoType} numberOfLines={1}>
                            {data?.sugar.category} - Niveau {data?.sugar.difficulty}
                        </Text>
                    </View>
                </>
            )}
        </TouchableOpacity>
    );
}
