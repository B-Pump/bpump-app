import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "../../../constants";
import styles from "../../common/cards/style/exoscard.style";

export default function ExosCard({ exo, handleNavigate }) {
    return (
        <TouchableOpacity style={styles.container} onPress={handleNavigate}>
            <View style={styles.logoContainer}>
                <Image source={images.logo} resizeMode="contain" style={styles.logoImage} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.exoName} numberOfLines={1}>
                    {exo.title} - {exo.difficulty}/5 ⭐
                </Text>
                <Text style={styles.exoType} numberOfLines={1}>
                    {exo.category}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
