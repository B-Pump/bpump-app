import { useRouter } from "expo-router"
import { Pressable, Image } from "react-native"

import styles from "./style/screenheader.style"

/**
 * Composant représentant un bouton d'en tête de l'écran
 * @param {Object} props - Propriétés du composant
 * @param {string} props.iconUrl - URL de l'icône du bouton
 * @param {string} props.dimension - Dimension du bouton (en %)
 * @param {Function} props.handlePress - Fonction appelée lorsqu'on appuie sur le bouton
 * @returns {React.Component} - Composant du bouton d'en tête de l'écran
 */
const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
    const router = useRouter()

    return (
        <Pressable
            style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 },
                styles.btnContainer,
            ]}
            onPress={handlePress}
            android_disableSound={false}
        >
            <Image
                source={iconUrl}
                resizeMode="cover"
                style={styles.btnImg(dimension)}
            />
        </Pressable>
    )
}

export default ScreenHeaderBtn
