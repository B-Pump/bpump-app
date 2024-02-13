import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "../../../constants";
import styles from "../../common/cards/style/progscard.style";

export default function ProgsCard({ data, load, error }) {
    return (
        <TouchableOpacity style={styles.container}>
            {load ? (
                <ActivityIndicator size="large" color={COLORS.light.text} />
            ) : error ? (
                <Text>Erreur lors du chargement du programme</Text>
            ) : (
                <>
                    <View style={styles.logoContainer}>
                        <Image source={images.logo} resizeMode="contain" style={styles.logoImage} />
                    </View>
                    <Text style={styles.progCategory} numberOfLines={1}>
                        {data.description}
                    </Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.progTitle} numberOfLines={1}>
                            {data.title}
                        </Text>
                        <View style={styles.infoWrapper}>
                            <Text style={styles.publisher}>Test 2</Text>
                            <Text style={styles.infosup}>Test 3</Text>
                        </View>
                    </View>
                </>
            )}
        </TouchableOpacity>
    );
}
