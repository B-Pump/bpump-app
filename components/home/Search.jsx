import { ActivityIndicator, Text, View } from "react-native";

import { ExosCard } from "../common/cards/ExosCard";

import { COLORS } from "../../constants";
import styles from "./style/search.style";

export default function Search({ data, load, error, keyword }) {
    const filteredData = data?.filter((item) => {
        return (
            // TODO: asynchronization to wait for isLoading and error to be ok
            item?.sugar?.title.toLowerCase().includes(keyword.toLowerCase()) ||
            item?.sugar?.description.toLowerCase().includes(keyword.toLowerCase()) ||
            item?.sugar?.category.toLowerCase().includes(keyword.toLowerCase())
        );
    });

    return (
        <View style={styles.container}>
            <View style={styles.cardsContainer}>
                {load ? (
                    <ActivityIndicator size="large" color={COLORS.light.text} />
                ) : error ? (
                    <Text>{error}</Text>
                ) : filteredData.length > 0 ? (
                    filteredData?.map((item, index) => <ExosCard data={item} load={load} error={error} key={index} />)
                ) : (
                    <Text>Aucun résultat trouvé pour "{keyword}", veuillez réessayer...</Text>
                )}
            </View>
        </View>
    );
}
