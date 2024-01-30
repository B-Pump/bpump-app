import { ActivityIndicator, Text, View } from "react-native";

import useFetch from "../../context/api";
import { ExosCard } from "../common/cards/ExosCard";

import { COLORS } from "../../constants";
import styles from "./style/search.style";

export default function Search({ data, load, error, keyword }) {
    const filteredData = data?.filter((item) => {
        const { data, isLoading, error } = useFetch("GET", "exos", item, {});
        return (
            // TODO: asynchronization to wait for isLoading and error to be ok
            data[item]?.sugar.title.toLowerCase().includes(keyword) ||
            data[item]?.sugar.description.toLowerCase().includes(keyword) ||
            data[item]?.sugar.category.toLowerCase().includes(keyword)
        );
    });

    return (
        <View style={styles.container}>
            <View style={styles.cardsContainer}>
                {load ? (
                    <ActivityIndicator size="large" color={COLORS.light.text} />
                ) : error ? (
                    <Text>Erreur lors du chargement de votre recherche</Text>
                ) : filteredData.length > 0 ? (
                    filteredData?.map((item, index) => <ExosCard exo={item} key={index} />)
                ) : (
                    <Text>Aucun résultat trouvé pour "{keyword}", veuillez réessayer...</Text>
                )}
            </View>
        </View>
    );
}
