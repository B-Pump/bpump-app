import { ActivityIndicator, Text, View } from "react-native";

import { ExosCard } from "../common/cards/ExosCard";

import { COLORS } from "../../constants";
import styles from "./style/showall.style";

export default function Showall({ data, load, error }) {
    return (
        <>
            {load ? (
                <ActivityIndicator size="large" color={COLORS.light.text} />
            ) : error ? (
                <Text>Erreur lors du chargement des détails de l'exercice</Text>
            ) : (
                <>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Tous les exercices</Text>
                        <Text style={styles.desc}>Préparez vous à faire du sport !</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        {load ? (
                            <ActivityIndicator size="large" color={COLORS.light.text} />
                        ) : error ? (
                            <Text>Erreur lors du chargement des exercices</Text>
                        ) : (
                            data?.map((item, index) => <ExosCard data={item} load={load} error={error} key={index} />)
                        )}
                    </View>
                </>
            )}
        </>
    );
}
