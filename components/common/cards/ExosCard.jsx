import { View, Text, Pressable, Image } from "react-native"

import styles from "./style/exoscard.style"
import { checkImageURL } from "../../../utils/checkImageURL"

/**
 * Composant représentant une carte cliquable pour accèder aux détails de l'exercice
 * @param {Object} props - Propriété du composant
 * @param {Object} props.item - Informations sur l'exercice à afficher sur la carte
 * @param {Function} props.handleCardPress - Fonction appelée lorsqu'on appuie sur la carte
 * @returns {React.ReactNode} - Composant de la carte d'exercice
 */
const ExosCard = ({ item, handleCardPress }) => {
    return (
        <>
            <Pressable
                style={({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1 },
                    styles.container,
                ]}
                onPress={handleCardPress(item)}
            >
                <Pressable
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1 },
                        styles.logoContainer,
                    ]}
                >
                    <Image
                        source={{
                            uri: checkImageURL(item.exo_logo)
                                ? item.exo_logo
                                : "https://urlz.fr/pjmA",
                        }}
                        resizeMode="contain"
                        style={styles.logoImage}
                    />
                </Pressable>
                <View style={styles.textContainer}>
                    <Text style={styles.exoName} numberOfLines={1}>
                        {item.exo_title}
                    </Text>
                    <Text style={styles.exoType}>{item.exo_type}</Text>
                </View>
            </Pressable>
        </>
    )
}

export default ExosCard
