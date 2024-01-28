import { ActivityIndicator, Text, View } from "react-native";

import useFetch from "../../context/api";

import { COLORS } from "../../constants";

export default function Exo({ exo }) {
    const { data, isLoading, error } = useFetch("GET", "exos", exo, {});

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.light.text} />
            ) : error ? (
                <Text>Erreur</Text>
            ) : (
                <Text>Exercice - {data.sugar?.title}</Text>
            )}
        </View>
    );
}
